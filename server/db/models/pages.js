/**
 * Created by Austin on 10/1/15.
 */
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    story: {type: Schema.Types.ObjectId, ref: 'Story', required: true},
    text: String,
    image: String,
    tools: [String],
    variables: [String],
    concepts: [String],
    hint: String,
    gameboard: [],
    requirements: []
});



mongoose.model('Page', schema);



