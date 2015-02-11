var mongoose = require("mongoose");
//Define the db schema
var matchSchema = new mongoose.Schema({
      name: { type: String }
    , date: Number
    , avatar: String
    , id: Number
    , distance: String
    , messages: Number
    , loc: {
    	type: [Number],
    	index: '2d'
    }
});

// Compile a 'Match' model using the movieSchema as the structure.
// Mongoose also creates a MongoDB collection called 'Match' for these documents.
var Match = mongoose.model('Match', matchSchema);
module.exports.Match = Match;