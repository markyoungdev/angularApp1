var mongoose = require("mongoose");
var Match = require('./schema');
var matchObj = Match.Match;
mongoose.set('debug', true);
module.exports = [
    { method: 'GET',
     path: '/api/matches/{id}',
     config: { handler: getMatches } 
 	},
    { method: 'GET',
     path: '/api/newmatches/{id}/{lat}/{lng}/{radius}',
     config: { handler: getFreshMatches } 
  },
    { method: 'GET',
     path: '/api/match/{id}',
     config: { handler: getMatch } 
 	},
    { method: 'POST',
     path: '/api/match/add/{requestor}/{requestee}',
     config: { handler: addMatch /*payload: 'parse'*/ } 
 	},
  { method: 'POST',
     path: '/api/match/deny/{requestor}/{requestee}',
     config: { handler: denyMatch /*payload: 'parse'*/ } 
  },
    { method: 'POST',
     path: '/api/createtest/{name}/{img}/{username}/{lat}/{lng}/{distance}/{hidden}',
     config: { handler: createTestUsers /*payload: 'parse'*/ } 
  },
    { method: 'GET',
       path: '/api/user/{userID}',
       config: { handler: getUserID /*payload: 'parse'*/ } 
    },
    { method: 'POST',
       path: '/api/user/update/{id}/{lat}/{lng}',
       config: { handler: updateUserData /*payload: 'parse'*/ } 
    },
    { method: 'GET',
       path: '/api/user/image/{userID}',
       config: { handler: getUserImage /*payload: 'parse'*/ } 
    },
    { method: 'GET',
       path: '/api/freshmatches/{id}',
       config: { handler: getFreshMatches /*payload: 'parse'*/ } 
    },
    { method: 'POST',
       path: '/api/user/settings/{id}/{visibility}/{searchRange}/{bio}',
       config: { handler: updateUserSettings /*payload: 'parse'*/ } 
    },
    { method: 'GET',
       path: '/api/user/settings/{id}',
       config: { handler: getUserSettings /*payload: 'parse'*/ } 
    }

];

/*=============================================
=               GET USER DATA                =
=============================================*/
function getUserImage(request, reply){  
  if (request.params.userID) {
   var userID = request.params.userID;
  //console.log('userID = '+userID);
   matchObj.findOne({username: userID}, function(err, user) {
    //if(err) return err;
    
    reply(user.avatar);
    //console.log(user.avatar);
   }); 

  } else {
    console.log('error, no user id provided!');
  }

}
function getUserID(request, reply){  
    if (request.params.userID) {
   var userID = request.params.userID;
     matchObj.findOne({username: userID}, function(err, user) {
       if (err) {
         console.log(err.name);
         return;
      }
      if (!user) {
        var user = {}
        user.id = 0;
         reply({data: user});
         console.log('new user')
      } else {       
       //console.log('This is the user func:'+user);
        reply(user);
      }
     });  

    } else {
      console.log('error, no user id provided!');
    }

}

/*-----  End of GET USER DATA  ------*/
/*=============================================
=               MATCH GETTERS                 =
=============================================*/
function getMatches(request,reply) {
 if (request.params.id) {  
  var id = request.params.id;
  console.log(id);
  matchObj.getFriends(id, function (err, friendships) {
   // console.log(friendships);
    reply(friendships);    
  });
} 
}

function getMatch(request,reply) {
    if (request.params.id) {      
      var id = request.params.id;
      console.log('line 139:'+id);
      matchObj.findById(id, function(err, user){
        var foundMatch = user;       
        reply(foundMatch);
      });       
    }
    else {
       console.log('No id provided');
    }
}

function getFreshMatches(request, reply) {
  if (request.params.id) {
    var id = request.params.id;   
    console.log('ID = '+id); 
    var ids = mongoose.Types.ObjectId(id);
    var idsArray = new Array(ids);
    var lat = parseFloat(request.params.lat);
    var lng = parseFloat(request.params.lng);
    var radius = parseInt(request.params.radius);   
    var test = matchObj.aggregate([
    {
      $geoNear: {
         near: { type: "Point", coordinates: [lng, lat] },
         distanceField: "dist.calculated",
         includeLocs: "dist.location",
         maxDistance: radius,
         num: 50,
         spherical: true,
         query: { 
          hidden: false, 
          _id : { $ne: ids },
          $or: [
            { 'friends._id': { $exists: false } },
            { 'friends._id': { $exists: true, $nin: idsArray } }             
          ]
         }
      }
    }   
  ])
    .exec();
  
    console.log(test);
    reply(test);    
  }
}
/*============================================
=                UpdateUserData              =
=============================================*/
function updateUserData(request, reply) {
  if (request.params.id) {
    var id = request.params.id;
    var coords = request.params.coords;
    var lat = parseFloat(request.params.lat);
    var lng = parseFloat(request.params.lng);
    var update =  {'loc': coords};
    var query = { _id: id };
    var options = { multi: true };
    matchObj.update(query, { 'loc': {"lat": lat, 'lng': lng } }, { multi: true , upsert: true}, function (err, numberAffected, raw) {
      if (err) return console.log(err);
      console.log('The number of updated documents was %d', numberAffected);
      console.log('The raw response from Mongo was ', raw);
    });  
    }    
}

/*=============================================
=            Update user settings            =
=============================================*/
function updateUserSettings(request, reply) {
  var id        = request.params.id;
  var distance  = request.params.searchRange;
  var hidden    = request.params.visibility;
  var bio       = request.params.bio;
  console.log(bio);
  var query     = { username: id };
  var options   = { multi: true, upsert: true };
  var update    = { 'distance': distance, 'hidden': hidden, 'bio': bio }
  matchObj.update(query, update, options, function (err, numberAffected, raw) {
    if (err) return console.log(err);
    console.log('The number of updated documents was %d', numberAffected);
    console.log('The raw response from Mongo was ', raw);
  });
}

/*=============================================
=               Get user settings            =
=============================================*/

function getUserSettings(request, reply) {
  var id        = request.params.id;
  console.log(id);
 matchObj.findOne({username: id}, 'distance hidden bio', function(err, settings) {
  reply( settings );
 
 })      
}
/*=============================================
=               MATCH ADDING                 =
=============================================*/
function addMatch(request,reply) {   
  //console.log(request); 
   if (request.params.requestor) {
    var requestor = request.params.requestor;
    var requestee = request.params.requestee;    
     matchObj.requestFriend(requestor, requestee, function(data){
      console.log(data);
     });  
  }
}
/*=============================================
=               MATCH Denying                 =
=============================================*/
function denyMatch(request,reply) {   
  //console.log(request); 
   if (request.params.requestor) {
    var requestor = request.params.requestor;
    var requestee = request.params.requestee;    
     matchObj.declineFriend(requestor, requestee, function(data){
      console.log(data);
     });  
  }
}

function createTestUsers(request, reply) {
  console.log(request);
  var name = request.params.name;
  var username = request.params.username;
  var lat = parseFloat(request.params.lat);
  var lng = parseFloat(request.params.lng); 
  var avatar = '/images/matches/'+request.params.img+'.jpg';
  var addMatch = new matchObj({
      name: name      
      , avatar: avatar       
      , username: username      
      , loc: {"lat": lat, 'lng': lng } 
  });

  addMatch.save(function(err, addMatch) {
    if (err) return console.error(err);
    //console.dir(addMatch);
  });
  reply(addMatch);
}
/*-----  End of MATCH ADDING  ------*/