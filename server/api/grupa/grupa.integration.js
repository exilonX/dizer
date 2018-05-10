'use strict';

var app = require('../..');
var request = require('supertest');

var newGrupa;

describe('Grupa API:', function() {

  describe('GET /api/grupas', function() {
    var grupas;

    beforeEach(function(done) {
      request(app)
        .get('/api/grupas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          grupas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      grupas.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/grupas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/grupas')
        .send({
          name: 'New Grupa',
          info: 'This is the brand new grupa!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newGrupa = res.body;
          done();
        });
    });

    it('should respond with the newly created grupa', function() {
      newGrupa.name.should.equal('New Grupa');
      newGrupa.info.should.equal('This is the brand new grupa!!!');
    });

  });

  describe('GET /api/grupas/:id', function() {
    var grupa;

    beforeEach(function(done) {
      request(app)
        .get('/api/grupas/' + newGrupa._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          grupa = res.body;
          done();
        });
    });

    afterEach(function() {
      grupa = {};
    });

    it('should respond with the requested grupa', function() {
      grupa.name.should.equal('New Grupa');
      grupa.info.should.equal('This is the brand new grupa!!!');
    });

  });

  describe('PUT /api/grupas/:id', function() {
    var updatedGrupa

    beforeEach(function(done) {
      request(app)
        .put('/api/grupas/' + newGrupa._id)
        .send({
          name: 'Updated Grupa',
          info: 'This is the updated grupa!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedGrupa = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGrupa = {};
    });

    it('should respond with the updated grupa', function() {
      updatedGrupa.name.should.equal('Updated Grupa');
      updatedGrupa.info.should.equal('This is the updated grupa!!!');
    });

  });

  describe('DELETE /api/grupas/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/grupas/' + newGrupa._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when grupa does not exist', function(done) {
      request(app)
        .delete('/api/grupas/' + newGrupa._id)
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
