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
    variables: [],
    concepts: [String],
    hint: String,
    gameboard: [],
    requirements: {}, //win scenario {var:{action:{val:false}}}
    pageNumber: Number,
    boardBackground: {type: String, default: 'images/flower-field.png'}
});



mongoose.model('Page', schema);



