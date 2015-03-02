var Hapi = require('hapi');
var mongoose = require("mongoose");
var Match = require('./src/schema');
var routes = require('./src/routes');

var server = new Hapi.Server();
//Setup the server connection and add routes
server.connection({ port: 3000, routes: { cors: true } });
for (var route in routes) {
    server.route(routes[route]);
}
//server.addRoutes(routes);

var dbUrl = 'mongodb://localhost:27017/app1db';
var dbOtions = {
    db: { native_parser: true },
    server: { poolSize: 5 }
};

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {});
//console.log(Match.Match);

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
