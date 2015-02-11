var mongoose = require("mongoose");
var options = {
    accountName: 'Match',
    friendshipName: 'Buddy'
};
var friendsOfFriends = require('friends-of-friends')(options);

//Define the db schema
var matchSchema = new mongoose.Schema({
    username: { type: String, unique: true }
    , name: { type: String }
    , date: Number
    , avatar: String    
    , distance: String
    , messages: Number
    , loc: {
    	type: [Number],
    	index: '2d'
    }
});

// apply friends-of-friends plugin to your User schema 
matchSchema.plugin(friendsOfFriends.plugin, options);

// Compile a 'Match' model using the movieSchema as the structure.
// Mongoose also creates a MongoDB collection called 'Match' for these documents.
var Match = mongoose.model(options.accountName, matchSchema);
module.exports.Match = Match;