'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var contractCtrlStub = {
  index: 'contractCtrl.index',
  show: 'contractCtrl.show',
  create: 'contractCtrl.create',
  update: 'contractCtrl.update',
  destroy: 'contractCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var contractIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './contract.controller': contractCtrlStub
});

describe('Contract API Router:', function() {

  it('should return an express router instance', function() {
    contractIndex.should.equal(routerStub);
  });

  describe('GET /api/contracts', function() {

    it('should route to contract.controller.index', function() {
      routerStub.get
        .withArgs('/', 'contractCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/contracts/:id', function() {

    it('should route to contract.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'contractCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/contracts', function() {

    it('should route to contract.controller.create', function() {
      routerStub.post
        .withArgs('/', 'contractCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/contracts/:id', function() {

    it('should route to contract.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'contractCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/contracts/:id', function() {

    it('should route to contract.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'contractCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/contracts/:id', function() {

    it('should route to contract.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'contractCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
