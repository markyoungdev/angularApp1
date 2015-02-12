var mongoose = require("mongoose");
var Match = require('./schema');
var matchObj = Match.Match;
module.exports = [
    { method: 'GET',
     path: '/api/matches',
     config: { handler: getMatches } 
 	},
    { method: 'GET',
     path: '/api/match/{id}',
     config: { handler: getMatch } 
 	},
    { method: 'POST',
     path: '/api/add',
     config: { handler: addMatch /*payload: 'parse'*/ } 
 	},
    { method: 'POST',
     path: '/api/createtest/{name}/{img}',
     config: { handler: createTestUsers /*payload: 'parse'*/ } 
  },
    { method: 'GET',
       path: '/api/user/{userID}',
       config: { handler: getUserID /*payload: 'parse'*/ } 
    }
];

/*=============================================
=               GET USER DATA                =
=============================================*/
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
         reply(user);
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
    var id = request.params.id
  }
}
/*-----  End of MATCH GETTERS  ------*/

/*=============================================
=               MATCH ADDING                 =
=============================================*/
function addMatch(request,reply) {   
  //console.log(request); 
    var addMatch = new matchObj({
        name: 'Tayler'
        , date: 64.5
        , avatar: '/images/matches/img3.jpg'  // Notice the use of a String rather than a Number - Mongoose will automatically convert this for us.
        , distance: '30mi'
        , messages: 5
    });

    addMatch.friendRequest('54da52a2035258f65b9585bd', function (err, request) {
    if (err) throw err;
 
    console.log('request', request);     
    });


    /*addMatch.save(function(err, addMatch) {
      if (err) return console.error(err);
      //console.dir(addMatch);
    });*/
    reply(addMatch);
}
function createTestUsers(request, reply) {
  console.log(request);
  var name = request.params.name;
  var avatar = '/images/matches/'+request.params.img+'.jpg';
  var addMatch = new matchObj({
      name: name
      , date: 64.5
      , avatar: avatar  
      , distance: '30mi'
      , messages: 5
  });

  addMatch.save(function(err, addMatch) {
    if (err) return console.error(err);
    //console.dir(addMatch);
  });
  reply(addMatch);
}
/*-----  End of MATCH ADDING  ------*/