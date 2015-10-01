/**
 * Created by Austin on 10/1/15.
 */
var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');
var Story = mongoose.model('Story');


//get all
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
router.post('/', (req, res, next) => {
    Story.create(req.body.newStory)
    .then(story => res.status(201).send(story))
    .then(null, next);
});

//edit one
router.put('/:storyId', (req, res, next) => {
    _.assign(req.story, req.body.editStory);
    req.story.save()
    .then(story => res.status(200).send(story))
    .then(null, next);
});

//delete one
router.delete('/:storyId', (req, res, next) => {
    Story.remove({_id: req.story._id}).exec()
    .then(removed => res.status(200).send(removed))
    .then(null, next);
});

router.param('storyId', (req, res, next, storyId) => {
    Story.findById(storyId)
    .then(story => {
            req.story = story;
            next();
        })
    .then(null, next)
});
