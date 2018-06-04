'use strict';

var app = require('../..');
var request = require('supertest');

var newCursant;

describe('Cursant API:', function() {

  describe('GET /api/cursants', function() {
    var cursants;

    beforeEach(function(done) {
      request(app)
        .get('/api/cursants')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          cursants = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      cursants.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/cursants', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/cursants')
        .send({
          name: 'New Cursant',
          info: 'This is the brand new cursant!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newCursant = res.body;
          done();
        });
    });

    it('should respond with the newly created cursant', function() {
      newCursant.name.should.equal('New Cursant');
      newCursant.info.should.equal('This is the brand new cursant!!!');
    });

  });

  describe('GET /api/cursants/:id', function() {
    var cursant;

    beforeEach(function(done) {
      request(app)
        .get('/api/cursants/' + newCursant._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          cursant = res.body;
          done();
        });
    });

    afterEach(function() {
      cursant = {};
    });

    it('should respond with the requested cursant', function() {
      cursant.name.should.equal('New Cursant');
      cursant.info.should.equal('This is the brand new cursant!!!');
    });

  });

  describe('PUT /api/cursants/:id', function() {
    var updatedCursant

    beforeEach(function(done) {
      request(app)
        .put('/api/cursants/' + newCursant._id)
        .send({
          name: 'Updated Cursant',
          info: 'This is the updated cursant!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCursant = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCursant = {};
    });

    it('should respond with the updated cursant', function() {
      updatedCursant.name.should.equal('Updated Cursant');
      updatedCursant.info.should.equal('This is the updated cursant!!!');
    });

  });

  describe('DELETE /api/cursants/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/cursants/' + newCursant._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when cursant does not exist', function(done) {
      request(app)
        .delete('/api/cursants/' + newCursant._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
