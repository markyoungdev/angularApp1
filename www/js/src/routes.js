var mongoose = require("mongoose");
var Match = require('./schema');
var matchObj = Match.Match;
module.exports = [
    { method: 'GET',
     path: '/api/matches',
     config: { handler: getMatches } 
 	},
    { method: 'GET',
     path: '/api/newmatches/{id}',
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
     path: '/api/createtest/{name}/{img}/{username}',
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
    }
];

/*=============================================
=               GET USER DATA                =
=============================================*/
function getUserImage(request, reply){  
  if (request.params.userID) {
   var userID = request.params.userID;
   matchObj.findOne({username: userID}, function(err, user) {
    if(err) return err;
    
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
        console.log(user);
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
    matchObj.find(function(err, matches) {
        if (err) return console.error(err);      
        var matchesArray = matches;       
        reply(matchesArray);
    });          
}

function getNewMatches(request,reply) { 
    if (request.params.id) {      
      var id = request.params.id;
      matchObj.find({ username: {'$ne':id+''} },function(err, matches) {     
        var matchesArray = matches;
        console.log(matchesArray);
        reply(matchesArray);
      });      
    }
    else {
       console.log('No id provided');
    }
}

function getMatch(request,reply) {
    if (request.params.id) {      
      var id = request.params.id;
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

    var User =  new matchObj({ username: id });
    User.getNonFriends(function (err, friends) {
    if (err) throw err;

    console.log('friends', friends);
    reply(friends);
    
    });
    

  }
}
/*=============================================
=            Section comment block            =
=============================================*/
function updateUserData(request, reply) {
  if (request.params.id) {
    var id = request.params.id;
    var coords = request.params.coords;
    var lat = parseFloat(request.params.lat);
    var lng = parseFloat(request.params.lng);
    var update =  {'loc': coords};
    var query = { username: id };
    var options = { multi: true };
    matchObj.update(query, { 'loc': {"lat": lat, 'lng': lng } }, { multi: true , upsert: true}, function (err, numberAffected, raw) {
      if (err) return console.log(err);
      console.log('The number of updated documents was %d', numberAffected);
      console.log('The raw response from Mongo was ', raw);
    });  
    }
    
}

/*-----  End of MATCH GETTERS  ------*/

/*=============================================
=               MATCH ADDING                 =
=============================================*/
function addMatch(request,reply) {   
  //console.log(request); 
   if (request.params.requestor) {
    var requestor = request.params.requestor;
    var requestee = request.params.requestee;
    var request = new matchObj({ username: requestor });

    request.friendRequest(requestee, function (err, request) {
      if (err) throw err;
   
      console.log('request', request);     
    });
    reply(addMatch);
  }
}

function createTestUsers(request, reply) {
  console.log(request);
  var name = request.params.name;
  var username = request.params.username;
  var avatar = '/images/matches/'+request.params.img+'.jpg';
  var addMatch = new matchObj({
      name: name
      , date: 64.5
      , avatar: avatar  
      , distance: '30mi'
      , messages: 5
      , username: username
  });

  addMatch.save(function(err, addMatch) {
    if (err) return console.error(err);
    //console.dir(addMatch);
  });
  reply(addMatch);
}
/*-----  End of MATCH ADDING  ------*/