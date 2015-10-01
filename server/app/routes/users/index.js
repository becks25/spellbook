var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');
var User = mongoose.model('User');
var Story = mongoose.model('Story');


//get all users
router.get('/', (req, res, next) => {
    User.find()
    .then(users => res.send(users))
    .then(null, next);
});

//get one
router.get('/:userId', (req, res, next) => {
    res.send(req.user);
});

//create one
router.post('/', (req, res, next) => {
    User.create(req.body.newUser)
    .then(user => res.status(201).send(user))
    .then(null, next);
});

//edit one
router.put('/:userId', (req, res, next) => {
    _.assign(req.user, req.body.editUser);
    req.user.save()
    .then(user => res.status(200).send(user))
    .then(null, next);
});

//delete one
router.delete('/:userId', (req, res, next) => {
    User.remove({_id: req.user._id}).exec()
    .then(removed => res.status(200).send(removed))
    .then(null, next);
});

router.param('userId', (req, res, next, userId) => {
    User.findById(userId)
    .then(user => {
            req.user = user;
            next();
        })
    .then(null, next)
});