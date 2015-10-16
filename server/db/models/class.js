var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new mongoose.Schema({
    teacher: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    name: String,
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'User'

    }],
    code: String,
    assignedStories: [{
        type: Schema.Types.ObjectId,
        ref: 'Story'
    }]

});



mongoose.model('Class', schema);



