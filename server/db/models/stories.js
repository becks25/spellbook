/**
 * Created by Austin on 10/1/15.
 */
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    author: String,
    difficulty: Number,
    concepts: [String],
    pages: [{type: Schema.Types.ObjectId, ref: 'Page'}]
});

mongoose.model('Story', schema);
