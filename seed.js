/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Story = Promise.promisifyAll(mongoose.model('Story'));
var Page = Promise.promisifyAll(mongoose.model('Page'));

User.remove({}, function(err, removed) {
  if (err) console.log(err);
});

Story.remove({}, function(err, removed) {
  if (err) console.log(err);
});

Page.remove({}, function(err, removed) {
  if (err) console.log(err);
});




var concepts = ['loops', 'if-statements', 'functions', 'recursion', 'asynch']
var descr = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.";

var seedStories = function(){
    var titles = ['Happy Dance', 'Omri', 'Joe\'s Salt', 'Adventures of Mark'];

    var stories = titles.map(function(title){
        return {
            title: title,
            description: descr,
            difficulty: Math.floor(Math.random()*10),
            concepts: [concepts[Math.floor(Math.random()*concepts.length)]]
        };
    });
     return Story.createAsync(stories);
};

var seedPages = function(stories){
    var pages = [];
    stories.forEach(function(story){
        for (i=0; i<3; i++){
            pages.push({
                story: story._id,
                text: descr,
                tools: ['move', 'pick-up', 'put-down', 'ask', 'tell', 'if', 'loop'],
                variables: ['Omri', 'Zeke', 'Joe', 'Say hi'],
                concepts: [concepts[Math.floor(Math.random()*concepts.length)]],
                hint: 'Try harder',
                requirements: [],
                gameboard: [
                    [ 
                        [], 
                        [], 
                        [{
                            type: 'Obstacle',
                            name: 'Rock'
                        }],
                        []

                    ],
                    [
                        [],
                        [{
                            type: 'Collectible',
                            name: 'Potion'
                        }],
                        [],
                        []
                    ],
                    [
                        [],
                        [],
                        [],
                        [],
                    ],
                    [
                        [],
                        [{
                            type: 'Obstacle',
                            name: 'Mountain'
                        }],
                        [],
                        []
                    ]
                ],
                pageNumber: i
            });
        }
    });
     return Page.createAsync(pages);
};

var seedUsers = function (stories, pages) {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password',
        },
        {
            email: 'obama@gmail.com',
            password: 'potus',
            isAdmin: true
        }
    ];

    var makeAge = function(min, max){
        return Math.floor(Math.random()*(max-min)) + min;
    };

    users.forEach(function(user){
        user.username = user.email;
        user.age = makeAge(5, 13);
        user.gender = Math.random() > 0.3 ? 'female' : 'male';
        user.character = {name: 'Omri'};
        user.mastery = [];
        concepts.forEach(function(concept){
            user.mastery.push({
                topic: concept,
                pointsEarned: Math.floor(Math.random()* 100),
                pointsPossible: Math.floor(Math.random()* 100) + 100
            });
        user.completedStories = [stories[Math.floor(Math.random()*stories.length)]._id];
        user.unfinishedPages = [pages[Math.floor(Math.random()*pages.length)]._id];
        });

    });

    return User.createAsync(users);

};

connectToDb.then(function () {
    // User.findAsync({}).then(function (users) {
        // if (users.length === 0) {
        //     return seedUsers();
        // } else {
        //     console.log(chalk.magenta('Seems to already be user data, exiting!'));
        //     process.kill(0);
        // }
    var tempUsers, tempStories, tempPages;
    seedStories()
    .then(function(stories){
        tempStories = stories;
        return seedPages(tempStories);
    }).then(function(pages){
        tempPages = pages;
        return seedUsers(tempStories, tempPages);
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
