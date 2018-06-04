'use strict';

var app = require('../..');
var request = require('supertest');

var newExamen;

describe('Examen API:', function() {

  describe('GET /api/examens', function() {
    var examens;

    beforeEach(function(done) {
      request(app)
        .get('/api/examens')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          examens = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      examens.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/examens', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/examens')
        .send({
          name: 'New Examen',
          info: 'This is the brand new examen!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newExamen = res.body;
          done();
        });
    });

    it('should respond with the newly created examen', function() {
      newExamen.name.should.equal('New Examen');
      newExamen.info.should.equal('This is the brand new examen!!!');
    });

  });

  describe('GET /api/examens/:id', function() {
    var examen;

    beforeEach(function(done) {
      request(app)
        .get('/api/examens/' + newExamen._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          examen = res.body;
          done();
        });
    });

    afterEach(function() {
      examen = {};
    });

    it('should respond with the requested examen', function() {
      examen.name.should.equal('New Examen');
      examen.info.should.equal('This is the brand new examen!!!');
    });

  });

  describe('PUT /api/examens/:id', function() {
    var updatedExamen

    beforeEach(function(done) {
      request(app)
        .put('/api/examens/' + newExamen._id)
        .send({
          name: 'Updated Examen',
          info: 'This is the updated examen!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedExamen = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedExamen = {};
    });

    it('should respond with the updated examen', function() {
      updatedExamen.name.should.equal('Updated Examen');
      updatedExamen.info.should.equal('This is the updated examen!!!');
    });

  });

  describe('DELETE /api/examens/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/examens/' + newExamen._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when examen does not exist', function(done) {
      request(app)
        .delete('/api/examens/' + newExamen._id)
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
