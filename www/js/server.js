var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 3000, routes: { cors: true } });

server.route({
    method: 'GET',
    path: '/api/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/api/post',
    handler: function (request, reply) {
    	 var matches = [
            {name: 'Katie', date: 63.1, avatar:'/images/avatar.jpg', id: 1, distance: "2mi", messages: 10},
            {name: 'Nia', date: 61.8, avatar:'/images/avatar2.jpg', id: 2, distance: "14mi", messages: 2},
            {name: 'Tayler', date: 61.8, avatar:'/images/avatar2.jpg', id: 2, distance: "14mi", messages: 2}
        ];
        reply(matches);
        //reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.route({
    method: 'Post',
    path: '/api/addPost',
    handler: function (request, reply) {
    	 var matches = [
            {name: 'Katie', date: 63.1, avatar:'/images/avatar.jpg', id: 1, distance: "2mi", messages: 10},
            {name: 'Nia', date: 61.8, avatar:'/images/avatar2.jpg', id: 2, distance: "14mi", messages: 2},
            {name: 'Tayler', date: 61.8, avatar:'/images/avatar2.jpg', id: 2, distance: "14mi", messages: 2}
        ];
        reply(matches);
        //reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});


server.start(function () {
    console.log('Server running at:', server.info.uri);
});