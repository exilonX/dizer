'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var cursantCtrlStub = {
  index: 'cursantCtrl.index',
  show: 'cursantCtrl.show',
  create: 'cursantCtrl.create',
  update: 'cursantCtrl.update',
  destroy: 'cursantCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var cursantIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './cursant.controller': cursantCtrlStub
});

describe('Cursant API Router:', function() {

  it('should return an express router instance', function() {
    cursantIndex.should.equal(routerStub);
  });

  describe('GET /api/cursants', function() {

    it('should route to cursant.controller.index', function() {
      routerStub.get
        .withArgs('/', 'cursantCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/cursants/:id', function() {

    it('should route to cursant.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'cursantCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/cursants', function() {

    it('should route to cursant.controller.create', function() {
      routerStub.post
        .withArgs('/', 'cursantCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/cursants/:id', function() {

    it('should route to cursant.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'cursantCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/cursants/:id', function() {

    it('should route to cursant.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'cursantCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/cursants/:id', function() {

    it('should route to cursant.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'cursantCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
