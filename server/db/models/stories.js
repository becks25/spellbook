/**
 * Created by Austin on 10/1/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    difficulty: Number,
    concepts: [String],
    cover: String
});

mongoose.model('Story', schema);
