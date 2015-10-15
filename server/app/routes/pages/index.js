/**
 * Created by Austin on 10/1/15.
 */

var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');
var Page = mongoose.model('Page');
var Story = mongoose.model('Story');

//find all
router.get('/', (req, res, next) => {
    Page.find(req.query)
        .then(pages => res.send(pages))
        .then(null, next);
});

//find all in a certain story
router.get('/story/:storyId', (req, res, next) => {
    Page.find()
        .where({story: req.params.storyId})
        .then(pages => res.send(pages))
        .then(null, next);
});

//get one
router.get('/:pageId', (req, res, next) => {
    res.send(req.page);
});

//create one
// passes in the body
router.post('/', (req, res, next) => {
    if(req.user) {
        return Page.create(req.body)
            .then(page => res.status(201).send(page))
            .then(null, next);
    } next();
});

//edit one
//pass the author and the edits in the body
router.put('/:pageId', (req, res, next) => {
    if(req.user._id.toString() === req.body.author.toString() || req.user.isAdmin) {
        _.assign(req.page, req.body.editPage);
        req.page.save()
            .then(page => res.status(200).send(page))
            .then(null, next);
    } next();
});

//delete one
router.delete('/:pageId', (req, res, next) => {
    if(req.user._id.toString() === req.body.author.toString() || req.user.isAdmin) {
        Page.remove({_id: req.page._id}).exec()
            .then(removed => res.status(200).send(removed))
            .then(null, next);
    } next();
});

router.param('pageId', (req, res, next, pageId) => {
    Page.findById(pageId)
        .then(page => {
            req.page = page;
            next();
        })
        .then(null, next)
});

router.param('storyId', (req, res, next, storyId) => {
    Story.findById(storyId)
        .then(story => {
            req.story = story;
            next();
        })
        .then(null, next)
});
