'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var facturaCtrlStub = {
  index: 'facturaCtrl.index',
  show: 'facturaCtrl.show',
  create: 'facturaCtrl.create',
  update: 'facturaCtrl.update',
  destroy: 'facturaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var facturaIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './factura.controller': facturaCtrlStub
});

describe('Factura API Router:', function() {

  it('should return an express router instance', function() {
    facturaIndex.should.equal(routerStub);
  });

  describe('GET /api/facturas', function() {

    it('should route to factura.controller.index', function() {
      routerStub.get
        .withArgs('/', 'facturaCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/facturas/:id', function() {

    it('should route to factura.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'facturaCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/facturas', function() {

    it('should route to factura.controller.create', function() {
      routerStub.post
        .withArgs('/', 'facturaCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/facturas/:id', function() {

    it('should route to factura.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'facturaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/facturas/:id', function() {

    it('should route to factura.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'facturaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/facturas/:id', function() {

    it('should route to factura.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'facturaCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
