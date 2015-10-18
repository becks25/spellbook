/**
 * Created by Austin on 10/1/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new mongoose.Schema({
    story: {type: Schema.Types.ObjectId, ref: 'Story', required: true},
    text: String,
    image: String, //not implemented yet, could be image behind the text
    tools: [String],
    variables: [],
    directions: [String],
    concepts: [String],
    hint: String,
    gameboard: [],
    requirements: {
        win: {}, // tripple nested dictionary: {subject: {action: {predicate: false}}}
        lose: {}, // ex: {key: {give: {guard: false}}}
        spellLength:Number, 
        numMoves: Number 
    },
    pageNumber: Number,
    boardBackground: {type: String, default: 'images/flower-field.png'},
    status: Number,
});



mongoose.model('Page', schema);



