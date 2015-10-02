/**
 * Created by Austin on 10/1/15.
 */
var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Story = mongoose.model('Story');
var Page = mongoose.model('Page');

//we made tests!
describe('Page Model', () => {
    var id;

    beforeEach('Establish DB connection', done => {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    beforeEach('Create a story', done => {
        Story.create({
                name: 'Omri',
                description: 'A delightful tale about Me!'
            }).then(story => {
                id = story._id;
            }).then(done);
    });

    afterEach('Clear test database', done => {
        clearDB(done);
    });

    it('should exist', done => {
        expect(Page).to.be.a('function');
        done();
    });

    describe('on creation', () => {
        var createPage = () => {
            return Page.create(
                {
                    story: id,
                    text: 'A delightful tale about Me!'
                })
        };
        it('should create a new Page', done => {
            createPage().then(page => {
                expect(page).to.exist;
                expect(page.story.toString()).to.equal(id.toString());
                expect(page.text).to.equal('A delightful tale about Me!');
                done();
            })
            .then(null, done)
        })
    })

});
