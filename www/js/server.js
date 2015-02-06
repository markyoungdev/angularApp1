var Hapi = require('hapi');
var mongoose = require("mongoose");

var server = new Hapi.Server();
server.connection({ port: 3000, routes: { cors: true } });


var dbUrl = 'mongodb://localhost:27017/app1db';
var dbOtions = {
    db: { native_parser: true },
    server: { poolSize: 5 }
};

server.route({
    method: 'GET',
    path: '/api/post',
    handler: function (request, reply) {
    	 var matches = [
            {name: 'Katie', date: 63.1, avatar:'/images/matches/img1.jpg', id: 1, distance: "2mi", messages: 10},
            {name: 'Nia', date: 61.8, avatar:'/images/matches/img2.jpg', id: 2, distance: "14mi", messages: 2},
            {name: 'Tayler', date: 61.8, avatar:'/images/matches/img3.jpg', id: 3, distance: "14mi", messages: 2},
            {name: 'Tayler', date: 61.8, avatar:'/images/matches/img4.jpg', id: 4, distance: "14mi", messages: 2}
        ];
        reply(matches);
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
