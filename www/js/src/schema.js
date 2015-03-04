var mongoose = require("mongoose");
var friends = require("mongoose-friends")
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
    username: { type: String, unique: true }
    , name: { type: String }
    , date: {type: Date, default: Date.now }
    , avatar: String    
    , distance: {type: Number, default: 30 }
    , messages: {type: Number, default: 1 }   
    , hidden: {type: Boolean, default: false }
    , searchRadius: Number
    , loc: {
    	type: {},
    	index: '2dsphere',
        sparse: true
    }
});

matchSchema.plugin(friends({pathName: "friends"}));

// apply friends-of-friends plugin to your User schema 
//matchSchema.plugin(friendsOfFriends.plugin, options);
// add caching 
//mongooseCachebox(mongoose, cacheOptions);
// Compile a 'Match' model using the movieSchema as the structure.
// Mongoose also creates a MongoDB collection called 'Match' for these documents.
//var Match = mongoose.model(options.accountName, matchSchema);
var Match = mongoose.model("Match", matchSchema);
module.exports.Match = Match;