var Hapi = require('hapi');
var mongoose = require("mongoose");

var server = new Hapi.Server();
server.connection({ port: 3000, routes: { cors: true } });

var dbUrl = 'mongodb://localhost:27017/app1db';
    var dbOtions = {
        db: { native_parser: true },
        server: { poolSize: 5 }
    };

    var db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', function() {
     
    });
     var matchSchema = new mongoose.Schema({
          name: { type: String }
        , date: Number
        , avatar: String
        , id: Number
        , distance: String
        , messages: Number
        });

        // Compile a 'Movie' model using the movieSchema as the structure.
        // Mongoose also creates a MongoDB collection called 'Movies' for these documents.
        var Match = mongoose.model('Match', matchSchema);

server.route({
    method: 'GET',
    path: '/api/post',
    handler: function (request, reply) {
    	/* var matches = [
            {name: 'Katie', date: 63.1, avatar:'/images/matches/img1.jpg', id: 1, distance: "2mi", messages: 10},
            {name: 'Nia', date: 61.8, avatar:'/images/matches/img2.jpg', id: 2, distance: "14mi", messages: 2},
            {name: 'Tayler', date: 61.8, avatar:'/images/matches/img3.jpg', id: 3, distance: "14mi", messages: 2},
            {name: 'Tayler', date: 61.8, avatar:'/images/matches/img4.jpg', id: 4, distance: "14mi", messages: 2}
        ];*/
         Match.find(function(err, matches) {
              if (err) return console.error(err);
              //console.dir(matches);
              var matchesArray = matches;
              console.log(matchesArray);
              reply(matchesArray);
            });
        
        //reply(matchesArray);
        //reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.route({
    method: 'GET',
    path: '/api/match/{id}',
    handler: function (request, reply) {
        console.log(request.params.id);
    	 var matches = [
            {name: 'Katie', date: 63.1, avatar:'/images/matches/img1.jpg', id: 1, distance: "2mi", messages: 10},
            {name: 'Nia', date: 61.8, avatar:'/images/matches/img2.jpg', id: 2, distance: "14mi", messages: 2},
            {name: 'Tayler', date: 61.8, avatar:'/images/matches/img3.jpg', id: 3, distance: "14mi", messages: 2},
            {name: 'Tayler', date: 61.8, avatar:'/images/matches/img4.jpg', id: 4, distance: "14mi", messages: 2}
        ];
        var selected = matches[request.params.id - 1];
        reply(selected);
        //reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.route({
    method: 'POST',
    path: '/api/add',
    handler: function (request, reply) {
        console.log(request);
        var addMatch = new Match({
          name: 'Takeshia'
        , date: 64.5
        , avatar: '/images/matches/img3.jpg'  // Notice the use of a String rather than a Number - Mongoose will automatically convert this for us.
        , id: 5
        , distance: '30mi'
        , messages: 5
        });

        addMatch.save(function(err, addMatch) {
          if (err) return console.error(err);
          console.dir(addMatch);
        });
        reply(addMatch);
        //reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});


// START THE DB //


server.start(function () {

    mongoose.connect(dbUrl, dbOtions, function(err) {
        if (err) server.log('error', err);
    });
});

// START THE SERVER //
server.start(function () {
    console.log('Server running at:', server.info.uri);
});
