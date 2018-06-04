'use strict';

var app = require('../..');
var request = require('supertest');

var newFactura;

describe('Factura API:', function() {

  describe('GET /api/facturas', function() {
    var facturas;

    beforeEach(function(done) {
      request(app)
        .get('/api/facturas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          facturas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      facturas.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/facturas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/facturas')
        .send({
          name: 'New Factura',
          info: 'This is the brand new factura!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newFactura = res.body;
          done();
        });
    });

    it('should respond with the newly created factura', function() {
      newFactura.name.should.equal('New Factura');
      newFactura.info.should.equal('This is the brand new factura!!!');
    });

  });

  describe('GET /api/facturas/:id', function() {
    var factura;

    beforeEach(function(done) {
      request(app)
        .get('/api/facturas/' + newFactura._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          factura = res.body;
          done();
        });
    });

    afterEach(function() {
      factura = {};
    });

    it('should respond with the requested factura', function() {
      factura.name.should.equal('New Factura');
      factura.info.should.equal('This is the brand new factura!!!');
    });

  });

  describe('PUT /api/facturas/:id', function() {
    var updatedFactura

    beforeEach(function(done) {
      request(app)
        .put('/api/facturas/' + newFactura._id)
        .send({
          name: 'Updated Factura',
          info: 'This is the updated factura!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedFactura = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFactura = {};
    });

    it('should respond with the updated factura', function() {
      updatedFactura.name.should.equal('Updated Factura');
      updatedFactura.info.should.equal('This is the updated factura!!!');
    });

  });

  describe('DELETE /api/facturas/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/facturas/' + newFactura._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when factura does not exist', function(done) {
      request(app)
        .delete('/api/facturas/' + newFactura._id)
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
