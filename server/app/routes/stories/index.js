/**
 * Created by Austin on 10/1/15.
 */
var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');
var Story = mongoose.model('Story');


//get all stories
router.get('/', (req, res, next) => {
    Story.find()
    .then(stories => res.send(stories))
    .then(null, next);
});

//get one
router.get('/:storyId', (req, res, next) => {
    res.send(req.story);
});

//create one
//using jsdata
router.post('/', (req, res, next) => {
    if(req.user) {
        Story.create(req.body)
            .then(story => res.status(201).send(story))
            .then(null, next);
    } next();
});

//edit one
//pass along author and story edits
router.put('/:storyId', (req, res, next) => {
    if(req.user._id.toString() === req.body.author.toString() || req.user.isAdmin) {
        _.assign(req.story, req.body);
        req.story.save()
            .then(story => res.status(200).send(story))
            .then(null, next);
    } next();
});

//delete one
router.delete('/:storyId', (req, res, next) => {
    if(req.user._id.toString() === req.body.author.toString() || req.user.isAdmin) {
        Story.remove({_id: req.story._id}).exec()
            .then(removed => res.status(200).send(removed))
            .then(null, next);
    } next();
});

router.param('storyId', (req, res, next, storyId) => {
    Story.findById(storyId)
    .then(story => {
            req.story = story;
            next();
        })
    .then(null, next)
});
