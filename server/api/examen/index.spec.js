'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var examenCtrlStub = {
  index: 'examenCtrl.index',
  show: 'examenCtrl.show',
  create: 'examenCtrl.create',
  update: 'examenCtrl.update',
  destroy: 'examenCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var examenIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './examen.controller': examenCtrlStub
});

describe('Examen API Router:', function() {

  it('should return an express router instance', function() {
    examenIndex.should.equal(routerStub);
  });

  describe('GET /api/examens', function() {

    it('should route to examen.controller.index', function() {
      routerStub.get
        .withArgs('/', 'examenCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/examens/:id', function() {

    it('should route to examen.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'examenCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/examens', function() {

    it('should route to examen.controller.create', function() {
      routerStub.post
        .withArgs('/', 'examenCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/examens/:id', function() {

    it('should route to examen.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'examenCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/examens/:id', function() {

    it('should route to examen.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'examenCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/examens/:id', function() {

    it('should route to examen.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'examenCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
