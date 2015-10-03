var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');
var User = mongoose.model('User');
var Story = mongoose.model('Story');


//get all users
router.get('/', (req, res, next) => {
    if (!req.user.isAdmin){
        res.sendStatus(401);
        return;
    }
    User.find().exec()
    .then(users => res.send(users))
    .then(null, next);
});

//get one
router.get('/:userId', (req, res, next) => {
    console.log(req.user)
    if (!req.user.isAdmin && (req.user._id !== req.foundUser._id)){
        res.sendStatus(401);
        return;
    }
    res.send(req.foundUser);
});

//create one
router.post('/', (req, res, next) => {
    if (!req.user || !req.user.isAdmin){
        req.body.isAdmin = false;
    }
    User.create(req.body.newUser)
    .then(user => res.status(201).send(user))
    .then(null, next);
});

//edit one
router.put('/:userId', (req, res, next) => {
    if (!req.user.isAdmin || (req.user._id !== req.foundUser._id)){
        res.sendStatus(401);
        return;
    }
    _.assign(req.foundUser, req.body);
    req.foundUser.save()
    .then(user => res.status(200).send(user))
    .then(null, next);
});

//delete one
router.delete('/:userId', (req, res, next) => {
    if (!req.user.isAdmin || (req.user._id !== req.foundUser._id)){
        res.sendStatus(401);
        return;
    }
    User.remove({_id: req.foundUser._id}).exec()
    .then(removed => res.status(200).send(removed))
    .then(null, next);
});

router.param('userId', (req, res, next, userId) => {
    User.findById(userId)
    .then(user => {
            req.foundUser = user;
            next();
        })
    .then(null, next)
});