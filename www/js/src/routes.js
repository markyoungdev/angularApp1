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
 	}
];

function getMatches(request,reply) {
  //console.log(request);
    matchObj.find(function(err, matches) {
        if (err) return console.error(err);
        console.dir(matches);
        var matchesArray = matches;
        console.log(matchesArray);
        reply(matchesArray);
    });          
}

function getMatch(request,reply) {
    if (request.params.id) {
        var matches = [
            {name: 'Katie', date: 63.1, avatar:'/images/matches/img1.jpg', id: 1, distance: "2mi", messages: 10},
            {name: 'Nia', date: 61.8, avatar:'/images/matches/img2.jpg', id: 2, distance: "14mi", messages: 2},
            {name: 'Tayler', date: 61.8, avatar:'/images/matches/img3.jpg', id: 3, distance: "14mi", messages: 2},
            {name: 'Tayler', date: 61.8, avatar:'/images/matches/img4.jpg', id: 4, distance: "14mi", messages: 2}
        ];
        var selected = matches[request.params.id - 1];
        reply(selected);
    }
    else {
       console.log('No id provided');
    }
}

function addMatch(request,reply) {
    var addMatch = new matchObj({
        name: 'Takeshia'
        , date: 64.5
        , avatar: '/images/matches/img3.jpg'  // Notice the use of a String rather than a Number - Mongoose will automatically convert this for us.
        , id: 5
        , distance: '30mi'
        , messages: 5
    });

    addMatch.save(function(err, addMatch) {
      if (err) return console.error(err);
      //console.dir(addMatch);
    });
    reply(addMatch);
}
