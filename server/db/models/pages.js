/**
 * Created by Austin on 10/1/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new mongoose.Schema({
    story: {type: Schema.Types.ObjectId, ref: 'Story', required: true},
    text: String,
    image: String,
    tools: [String],
    variables: [String],
    concepts: [String],
    hint: String,
    gameboard: [],
    requirements: {}, //win scenario {varName: val, varName: val}
    pageNumber: Number,
    boardBackground: {type: String, default: 'images/flower-field.png'}
});



mongoose.model('Page', schema);



