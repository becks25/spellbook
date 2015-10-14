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




var concepts = ['For Loop', 'While Loop', 'If-statements', 'Conditionals', 'Expressions', 'Movement']
var descr = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.</p>";
var backgrounds= ['images/space.png', 'images/flower-field.png', 'images/underwater.png'];

var seedStories = function(){
    var titles = ['Happy Dance', 'Omri', 'Joe\'s Salt', 'Adventures of Mark'];
    //var images = ['http://www.smashingmagazine.com/images/book-covers/book-covers-18.jpg', 'https://s-media-cache-ak0.pinimg.com/236x/31/b0/7f/31b07f4c094b63a20fba3d7a3143b69c.jpg', 'https://geekybooksnob.files.wordpress.com/2012/11/200px-life_of_pi_cover.png', 'http://www.adweek.com/galleycat/files/2012/08/8-bit-book-cover-The-Two-Towers.jpg']

    var stories = titles.map(function(title){
        return {
            title: title,
            description: descr,
            difficulty: Math.floor(Math.random()*10),
            concepts: [concepts[Math.floor(Math.random()*concepts.length)]],
            cover: 'http://www.smashingmagazine.com/images/book-covers/book-covers-18.jpg'
        };
    });


    stories.push({
        title: 'Mopsy and Moopsy',
        description: "Mopsy and Moopsy are in trouble- can you help them?",
        difficulty: 2,
        concepts: ['For Loop', 'If-statements'],
        cover: 'http://www.wpclipart.com/cartoon/animals/monkey_chimp/monkey_w_banana.png'

    });
    stories.push({
        title: 'Space Princess',
        description: "Aria gets lost in space and has to rescue a friend",
        difficulty: 3,
        concepts: ['Conditionals', 'While loop', 'For loop'],
        cover: 'http://www.printactivities.com/ColoringPages/Aliens/Alien-Princess.gif'

    });
     return Story.createAsync(stories);
};

var seedPages = function(stories){
    var pages = [];
    stories.forEach(function(story){
        if(story.title==='Mopsy and Moopsy'){
            pages.push({
                story: story._id,
                text:'<p>{{user.character.name}} was sitting at home, enjoying a nice cup of tea, when their super ears perked up- someone was crying for help!  It\'s Moopsy Monkey! </p><p class="promptText"> Can you help {{user.character.name}} find out what\'s wrong?</p>',
                tools: ['If-Statement', 'ask', 'move', 'give'],
                variables: [
                    {text: 'Moopsy_Monkey', varType: 'person'},
                    {text: 'Whats_wrong', varType: 'variable'}
                ],
                concepts: ['If-statements'],
                hint: 'Make sure you ask Moopsy what\'s wrong',
                requirements: {Moopsy_Monkey: {ask:{'Whats_wrong': false}}},
                gameboard: [
                    [
                        [],
                        [],
                        [{
                            type: 'Person',
                            name: 'Monkey2',
                            varName: 'Moopsy_Monkey'
                        }],
                        []
                    ],
                    [
                        [],
                        [],
                        [{
                            type:'Obstacle',
                            name:'Tree1'
                        }],
                        []
                    ],
                    [
                        [],
                        [],
                        [],
                        [{
                            type:'Obstacle',
                            name: 'Tree1'
                        }]
                    ],
                    [
                        [{
                            type: 'Avatar',
                            name:'Giraffe3'
                        }],
                        [],
                        [],
                        []
                    ]
                ],
                pageNumber: 0,
                boardBackground: 'image/flower-field.png'

            },{
                story: story._id,
                text:'<p>"It\'s my brother," said Moopsy. "He\'s crying and I don\'t know what to do!" </p><p>"Don\'t worry Moopsy, I\'ll go see if I can help"</p><p class="promptText">Can you see if Mopsy needs any help?</p>',
                tools: ['If-Statement', 'ask', 'move', 'give'],
                variables: [
                    {text: 'Mopsy_Monkey', varType: 'person'},
                    {text: 'Mopsy needs help', varType: 'condition'},
                    {text: 'How_can_I_help', varType:'variable'}
                ],
                concepts: ['If-statements'],
                hint: 'If Mopsy needs help, ask what you can do!',
                requirements: {Mopsy_Monkey: {ask:{'How_can_I_help': false}}},
                gameboard: [
                    [
                        [],
                        [],
                        [{
                            type: 'Avatar',
                            name: 'Giraffe3'
                        }],
                        []
                    ],
                    [
                        [],
                        [],
                        [{
                            type:'Obstacle',
                            name:'Tree1'
                        }],
                        []
                    ],
                    [
                        [],
                        [],
                        [],
                        [{
                            type:'Obstacle',
                            name: 'Tree1'
                        }]
                    ],
                    [
                        [],
                        [],
                        [],
                        [{
                            type: 'Person',
                            name:'Monkey1',
                            varName:'Mopsy_Monkey'
                        }]
                    ]
                ],
                pageNumber: 1,
                boardBackground: 'image/flower-field.png'

            },{
                story: story._id,
                text:'<p>"It\'s terrible," sighed Mopsy. "I\'ve dropped my bananas all over the place.  It\'ll take forever to pick them up again!"</p><p>"Not if I can help it!" exclaimed {{user.character.name}}</p><p class="promptText">Can you get all of Mopsy\'s bananas using only 4 tools?</p>',
                tools: ['If-Statement', 'pickUp', 'move', 'For Loop'],
                variables: [
                    {text: 'Banana', varType: 'variable'},
                    {text: 'Apple', varType:'variable'}
                ],
                concepts: ['For Loop'],
                hint: 'You can use a repeat to do an action more than once',
                requirements: {
                    'Banana&1': {pickUp:{val: false}},
                    'Banana&2': {pickUp:{val: false}},
                    'Banana&3': {pickUp:{val: false}}
                },
                gameboard: [
                    [
                        [{
                            type:'Collectible',
                            name:'Banana',
                            varName:'Banana&3'
                        }],
                        [],
                        [],
                        []
                    ],
                    [
                        [],
                        [{
                            type:'Collectible',
                            name:'Banana',
                            varName:'Banana&2'
                        }],
                        [{
                            type:'Obstacle',
                            name:'Tree1'
                        }],
                        []
                    ],
                    [
                        [],
                        [],
                        [{
                            type:'Collectible',
                            name:'Banana',
                            varName:'Banana&1'
                        }],
                        [{
                            type:'Obstacle',
                            name: 'Tree1'
                        }]
                    ],
                    [
                        [],
                        [],
                        [],
                        [{
                            type: 'Avatar',
                            name: 'Giraffe3'
                        }]
                    ]
                ],
                pageNumber: 2,
                boardBackground: 'image/flower-field.png'

            }

            );
        } else if(story.title==='Space Princess'){
            pages.push({
                story: story._id,
                text:'<p>Hi, I’m Aria.  I’m ten years old, my favorite color is yellow, and I have a pet kitten named Omri.  Oh, and I’m a princess. Most of the time, it’s pretty sweet.  Unfortunately, it doesn’t exempt me from having an annoying younger brother who always steals my toys. He’s so annoying, ugg. </p> <p> Today is my birthday and my Aunt says she has an exciting surprise for me.  She is a physicist at NASA, so I’m sure it will be something amazing.  She hid it in one of these boxes. </p><p class="promptText"> Can you go to each one, and pick it up if it is my present?</p>',
                tools: ['move', 'pickUp', 'ask', 'If-Statement', 'For Loop'],
                variables: [
                    {text: 'present', varType: 'variable'},
                    {text: 'a present is inside', varType: 'condition', fnType: 'match', arg: 'present'}
                ],
                concepts: ['If-statements'],
                hint: 'Try using the if-statement',
                requirements: {present: {pickUp: {val: false}}},
                gameboard: [
                    [
                        [{
                            type: 'Avatar',
                            name:'WizzardGirl3'
                        }],
                        [],
                        [],
                        [], 
                        []
                    ],
                    [
                        [],
                        [{
                            type: 'Collectible',
                            name: 'Chest1',
                            rand: 'loc'
                        }],
                        [],
                        [],
                        []
                    ],
                    [
                        [],
                        [],
                        [],
                        [{
                            type: 'Collectible',
                            name: 'Chest1',
                            rand: 'loc'
                        }],
                        []
                    ],
                    [
                        [],
                        [],
                        [],
                        [],
                        []
                    ],
                    [
                        [{
                            type: 'Obstacle',
                            name:'Tree1'
                        }],
                        [],
                        [{
                            type: 'Collectible',
                            name: 'Chest1',
                            varName: 'box',
                            match: 'present',
                            rand: 'loc'
                            }, {
                            type:'Collectible',
                            name: 'Empty',
                            varName: 'present'
                        }],
                        [], 
                        []
                    ]
                ],
                pageNumber: 0,
                boardBackground: 'image/flower-field.png'

            },{
                story: story._id,
                text:'<p>"Wow!  My present is a spaceship!  I was planning to explore our solar system, and was especially excited to see Saturn’s rings, but my brother kept coming inside and messing everything up.  He must have done some serious damage, because when I took off, I couldn’t control my navigation, and now I seem to have landed on a strange planet." </p><p>"When I got out of my spaceship, I was greeted by a strange creature, who introduced itself as Zeke.  Zeke is worried because he can’t find his best friend, Liz."</p><p class="promptText">Can you go to each of the aliens on the page and ask them if they have seen Liz?  You’re running low on power, so you can only use three commands.</p>',
                tools: ['move', 'pickUp', 'ask', 'tell', 'If-Statement', 'For Loop'],
                variables: [
                    {text: 'Have you seen Liz?', varType: 'variable'},
                    {text: 'Alien', varType: 'person'},
                    {text: 'Liz', varType:'person'},
                    {text: 'They have seen Liz', varType: 'condition', fnType: 'returnTrue', arg: 'arg'}
                ],
                concepts: ['For Loop'],
                hint: 'Try repeating, and think about using the bump to your advantage',
                requirements: {
                    'Alien&1': {ask:{'Have_you_seen_Liz?': false}},
                    'Alien&2': {ask:{'Have_you_seen_Liz?': false}},
                    'Alien&3': {ask:{'Have_you_seen_Liz?': false}},
                    'Alien&4': {ask:{'Have_you_seen_Liz?': false}}

                },
                gameboard: [
                    [
                        [{
                            type: 'Avatar',
                            name:'WizzardGirl3'
                        }],
                        [],
                        [],
                        [],
                        []
                    ],[
                        [],
                        [{
                            type:'Collectible',
                            name:'Crystal1',
                            varName:'Alien&1'
                        }],
                        [],
                        [],
                        []
                    ],[
                        [],
                        [],
                        [{
                            type:'Collectible',
                            name:'Crystal2',
                            varName:'Alien&2'
                        }],
                        [],
                        []
                    ],[
                        [],
                        [],
                        [],
                        [{
                            type:'Collectible',
                            name:'Crystal3',
                            varName:'Alien&3'
                        }],
                        []
                    ],[
                        [],
                        [],
                        [],
                        [{
                            type:'Collectible',
                            name:'Crystal1',
                            varName:'Alien&4'
                        }],
                        []
                    ]
                ],
                pageNumber: 1,
                boardBackground: 'image/mars.png'

            },{
                story: story._id,
                text:'<p>"Oh no, you discovered that Liz was captured by an evil warlord.  He’s keeping her locked in a cell somewhere in his fortress.  Fortunately, Zeke is friends with one of the guards, who will free Liz if you can bring him the key."</p><p>"To free Liz, you will need to find the right key, and give it to a guard named Nimit.  Carefull, though, if you give the key to the wrong guard, the evil warlord might find out you are here. And in order to keep quiet, you can only use three moves at level one of your spell.</p>',
                tools: ['move', 'pickUp', 'give', 'ask', 'While Loop'],
                variables: [
                    {text: 'key', varType: 'variable'},
                    {text: 'Guard', varType:'person'},
                    {text: 'What is your name?', varType: 'variable'},
                    {text: 'you are holding the key', varType: 'conditional', fnType: 'holding', arg: 'key'},
                    {text: 'The guard\s name is not Nimit', varType: 'condition', fnType: 'match', arg: 'notNimit'}
                ],
                concepts: ['While Loop', 'Conditionals', 'Expressions'],
                hint: 'You can use a repeat to do an action more than once',
                requirements: {
                    'key': {pickUp:{val: false}},
                    'Guard': {give:{key: false}},
                    // 'Guard&1': {pickUp:{val: true}}
                },
                        
                gameboard: [
                    [
                        [{
                            type: 'Avatar',
                            name:'WizzardGirl3'
                        }],
                        [{
                            type:'Collectible',
                            name:'Banana',
                            varName:'key'
                        }],
                        [],
                        [],
                        []
                    ],[
                        [],
                        [],
                        [{
                            type:'Person',
                            name:'Crystal1',
                            varName:'Guard&1',
                            match: 'notNimit'                            
                        }],
                        [{
                            type:'Person',
                            name:'Crystal1',
                            varName:'Guard&2',
                        }],
                        [{
                            type:'Person',
                            name:'Crystal1',
                            varName:'Guard&3',
                            match: 'notNimit'

                        }]
                    ],[
                        [],
                        [],
                        [],
                        [],
                        []
                    ],[
                        [],
                        [],
                        [],
                        [],
                        []
                    ],[
                        [],
                        [],
                        [],
                        [],
                        []
                    ]
                ],
                pageNumber: 2,
                boardBackground: 'image/mars.png'

            }

            );
        }else{
            for (i=0; i<3; i++){
                pages.push({
                    story: story._id,
                    text: descr,
                    tools: ['move', 'pickUp', 'give', 'ask', 'tell', 'If-Statement', 'For Loop', 'While Loop'],
                    variables: [{text: 'Omri', varType: 'person'}, {text: 'Zeke', varType: 'person'}, {text: 'Joe', varType: 'person'}, {text: 'Say hi', varType: 'variable'}, {text: 'Green Potion', varType: 'variable'}, {text: 'The potion is green', varType: 'condition'}],
                    concepts: [concepts[Math.floor(Math.random()*concepts.length)]],
                    hint: 'Try harder',
                    requirements: {Green_Potion: {pickUp: {val: false}}},
                    gameboard: [
                        [
                            [{
                                type: 'Avatar',
                                name: 'WizardBoy2'
                            }],
                            [],
                            [{
                                type: 'Obstacle',
                                name: 'Rock1'
                            }],
                            []

                        ],
                        [
                            [],
                            [{
                                type: 'Collectible',
                                name: 'Potion2',
                                varName: 'Green_Potion'
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
                                name: 'Tree2',
                                varName: 'tree'
                            }],
                            [],
                            []
                        ]
                    ],
                    pageNumber: i,
                    boardBackground: backgrounds[i]
                });
            }
        }
    });
     return Page.createAsync(pages);
};

var seedUsers = function (stories, pages) {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password',
            username: 'Giraffe',
            gender: 'other'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus',
            username: 'Obama',
            gender: 'male',
            isAdmin: true
        },
        {
            email: 'beckylee@gmail.com',
            password: 'becks',
            username: 'Beckylee',
            gender: 'female',
            isAdmin: true
        },
        {
            email: 'austin@gmail.com',
            password: 'austin',
            username: 'Austin',
            gender: 'male',
            isAdmin: true
        },
        {
            email: 'chandra@gmail.com',
            password: 'chandra',
            username: 'Chandra',
            gender: 'female',
            isAdmin: true
        },
        {
            email: 'emily@gmail.com',
            password: 'emily',
            username:'Emily',
            gender:'female',
            isAdmin: true
        }
    ];

    var makeAge = function(min, max){
        return Math.floor(Math.random()*(max-min)) + min;
    };

    var number = 0;

    var randomNumber = function(){
        number = Math.floor(Math.random()*10);
        return number;
    };

    users.forEach(function(user){
        user.age = makeAge(5, 13);
        user.mastery = [];
        concepts.forEach(function(concept){
            user.mastery.push({
                topic: concept,
                pointsEarned: randomNumber() * (Math.floor(Math.random()* 10)/10*50),
                pointsPossible:number*50
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
