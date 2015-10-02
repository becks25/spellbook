/**
 * Created by Austin on 10/1/15.
 */
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

describe('Story Model', () => {

    beforeEach('Establish DB connection', done => {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', done => {
        clearDB(done);
    });

    it('should exist', done => {
        expect(Story).to.be.a('function');
        done();
    });

    describe('on creation', () => {
        var createStory = () => {
            return Story.create(
                {
                    title: 'Omri',
                    description: 'A delightful tale about Me!'
                })
        };

        it('should create a new Story', done => {
            createStory().then(story => {
                expect(story).to.exist;
                expect(story.title).to.equal('Omri');
                expect(story.description).to.equal('A delightful tale about Me!');
                done();
            })
        })
    })

});
