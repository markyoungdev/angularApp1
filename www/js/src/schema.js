var mongoose = require("mongoose");
var friends = require("mongoose-friends")
var MongooseRattlePlugin = require('mongoose-rattle-plugin');
/*var options = {
    accountName: 'Match',
    friendshipName: 'Buddy'
};*/
/*var cacheOptions = {
    cache: true,
    ttl: 45
}*/
//var friendsOfFriends = require('friends-of-friends')(options);

//Define the db schema
var matchSchema = new mongoose.Schema({
    username        : { type: String, unique: true },
    email           : { type: String,  sparse: true, unique: true, trim: true  },
    name            : { type: String, default: null },
    visits          : { type: Number, default: null },    
    avatar          : { type: String, default: null }, 
    profile_image   : { type: String, default: null }, 
    images          : { type: Array },
    distance        : { type: Number, default: 30 },
    messages        : { type: Number, default: 1 },   
    hidden          : { type: Boolean, default: false },
    searchRadius    : { type: Number, default: 30 },
    restricted      : { type: Array },
    created         : {type: Date, default: Date.now },
    modified        : { type : Date, default : Date.now },
    bio             : {type: String, default: null},
    loc             : {
                    	type: {},
                    	index: '2dsphere',
                        sparse: true
                    }
});

matchSchema.plugin(friends({pathName: "friends"}));
//matchSchema.plugin(MongooseRattlePlugin);

//ADD FIELDS  using mongoose rattlesnake.

/*matchSchema.add({
  'myPersonalField': String
});*/

// apply friends-of-friends plugin to your User schema 
//matchSchema.plugin(friendsOfFriends.plugin, options);
// add caching 
//mongooseCachebox(mongoose, cacheOptions);
// Compile a 'Match' model using the movieSchema as the structure.
// Mongoose also creates a MongoDB collection called 'Match' for these documents.
//var Match = mongoose.model(options.accountName, matchSchema);
var Match = mongoose.model("Match", matchSchema);
module.exports.Match = Match;