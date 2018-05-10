'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var grupaCtrlStub = {
  index: 'grupaCtrl.index',
  show: 'grupaCtrl.show',
  create: 'grupaCtrl.create',
  update: 'grupaCtrl.update',
  destroy: 'grupaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var grupaIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './grupa.controller': grupaCtrlStub
});

describe('Grupa API Router:', function() {

  it('should return an express router instance', function() {
    grupaIndex.should.equal(routerStub);
  });

  describe('GET /api/grupas', function() {

    it('should route to grupa.controller.index', function() {
      routerStub.get
        .withArgs('/', 'grupaCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/grupas/:id', function() {

    it('should route to grupa.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'grupaCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/grupas', function() {

    it('should route to grupa.controller.create', function() {
      routerStub.post
        .withArgs('/', 'grupaCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/grupas/:id', function() {

    it('should route to grupa.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'grupaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/grupas/:id', function() {

    it('should route to grupa.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'grupaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/grupas/:id', function() {

    it('should route to grupa.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'grupaCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
