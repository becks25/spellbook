
var router = require('express').Router();
var mongoose = require('mongoose');
module.exports = router;
var _ = require('lodash');
var Class = mongoose.model('Class');

//find all
router.get('/', (req, res, next) => {
    Class.find(req.query)
        .then(classes => res.send(classes))
        .then(null, next);
});


//get one
router.get('/:classId', (req, res, next) => {
    res.send(req._class);
});

//create one
// passes in the body
router.post('/', (req, res, next) => {
    if(req.user) {
        return Class.create(req.body)
            .then(_class => res.status(201).send(_class))
            .then(null, next);
    } next();
});

//edit one
//pass the author and the edits in the body
router.put('/:classId', (req, res, next) => {
    if(req.user._id.toString() === req.body.teacher.toString() || req.user.isAdmin) {
        _.assign(req._class, req.body.editClass);
        req._class.save()
            .then(_class => res.status(200).send(_class))
            .then(null, next);
    } next();
});

//delete one
router.delete('/:classId', (req, res, next) => {
    if(req.user._id.toString() === req.body.teacher.toString() || req.user.isAdmin) {
        Class.remove({_id: req._class._id}).exec()
            .then(removed => res.status(200).send(removed))
            .then(null, next);
    } next();
});

router.param('classId', (req, res, next, classId) => {
    Class.findById(classId)
        .then(_class => {
            req._class = _class;
            next();
        })
        .then(null, next)
});

