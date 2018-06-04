'use strict';

var app = require('../..');
var request = require('supertest');

var newCurs;

describe('Curs API:', function() {

  describe('GET /api/curss', function() {
    var curss;

    beforeEach(function(done) {
      request(app)
        .get('/api/curss')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          curss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      curss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/curss', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/curss')
        .send({
          name: 'New Curs',
          info: 'This is the brand new curs!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newCurs = res.body;
          done();
        });
    });

    it('should respond with the newly created curs', function() {
      newCurs.name.should.equal('New Curs');
      newCurs.info.should.equal('This is the brand new curs!!!');
    });

  });

  describe('GET /api/curss/:id', function() {
    var curs;

    beforeEach(function(done) {
      request(app)
        .get('/api/curss/' + newCurs._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          curs = res.body;
          done();
        });
    });

    afterEach(function() {
      curs = {};
    });

    it('should respond with the requested curs', function() {
      curs.name.should.equal('New Curs');
      curs.info.should.equal('This is the brand new curs!!!');
    });

  });

  describe('PUT /api/curss/:id', function() {
    var updatedCurs

    beforeEach(function(done) {
      request(app)
        .put('/api/curss/' + newCurs._id)
        .send({
          name: 'Updated Curs',
          info: 'This is the updated curs!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCurs = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCurs = {};
    });

    it('should respond with the updated curs', function() {
      updatedCurs.name.should.equal('Updated Curs');
      updatedCurs.info.should.equal('This is the updated curs!!!');
    });

  });

  describe('DELETE /api/curss/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/curss/' + newCurs._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when curs does not exist', function(done) {
      request(app)
        .delete('/api/curss/' + newCurs._id)
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
