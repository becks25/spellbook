'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var objId = mongoose.Schema.ObjectId;
// var deepPopulate = require('mongoose-deep-populate')(mongoose);

var schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other', 'rather not say'],
        default: 'rather not say'
    },
    username: {
        type: String,
        required: true
    },
    character: {
        name: {type: String},
        picture: {
            type: String,
            default: 'Giraffe1'
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    mastery: [{
        topic: String,
        pointsEarned: Number,
        pointsPossible: Number
    }],
    completedStories: [{
        type: objId,
        ref: 'Story'

    }],
    unfinishedPages: [{
        type: objId,
        ref: 'Page'
    }],
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    },
    isTeacher: {
        type: Boolean,
        default: false
    }
});
// schema.plugin(deepPopulate);

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if(!this.character.name){
        this.character.name = this.username;
    }
    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

// not sure how to do this in an array, probably calc on front end
// schema.virtual('mastery.score').get(function(){
//         return Math.floor(topic.pointsEarned/topic.pointsPossible);
//     });
// });

mongoose.model('User', schema);
