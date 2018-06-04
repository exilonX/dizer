'use strict';

var app = require('../..');
var request = require('supertest');

var newContract;

describe('Contract API:', function() {

  describe('GET /api/contracts', function() {
    var contracts;

    beforeEach(function(done) {
      request(app)
        .get('/api/contracts')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          contracts = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      contracts.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/contracts', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/contracts')
        .send({
          name: 'New Contract',
          info: 'This is the brand new contract!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newContract = res.body;
          done();
        });
    });

    it('should respond with the newly created contract', function() {
      newContract.name.should.equal('New Contract');
      newContract.info.should.equal('This is the brand new contract!!!');
    });

  });

  describe('GET /api/contracts/:id', function() {
    var contract;

    beforeEach(function(done) {
      request(app)
        .get('/api/contracts/' + newContract._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          contract = res.body;
          done();
        });
    });

    afterEach(function() {
      contract = {};
    });

    it('should respond with the requested contract', function() {
      contract.name.should.equal('New Contract');
      contract.info.should.equal('This is the brand new contract!!!');
    });

  });

  describe('PUT /api/contracts/:id', function() {
    var updatedContract

    beforeEach(function(done) {
      request(app)
        .put('/api/contracts/' + newContract._id)
        .send({
          name: 'Updated Contract',
          info: 'This is the updated contract!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedContract = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedContract = {};
    });

    it('should respond with the updated contract', function() {
      updatedContract.name.should.equal('Updated Contract');
      updatedContract.info.should.equal('This is the updated contract!!!');
    });

  });

  describe('DELETE /api/contracts/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/contracts/' + newContract._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when contract does not exist', function(done) {
      request(app)
        .delete('/api/contracts/' + newContract._id)
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
