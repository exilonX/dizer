'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var cursCtrlStub = {
  index: 'cursCtrl.index',
  show: 'cursCtrl.show',
  create: 'cursCtrl.create',
  update: 'cursCtrl.update',
  destroy: 'cursCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var cursIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './curs.controller': cursCtrlStub
});

describe('Curs API Router:', function() {

  it('should return an express router instance', function() {
    cursIndex.should.equal(routerStub);
  });

  describe('GET /api/curss', function() {

    it('should route to curs.controller.index', function() {
      routerStub.get
        .withArgs('/', 'cursCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/curss/:id', function() {

    it('should route to curs.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'cursCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/curss', function() {

    it('should route to curs.controller.create', function() {
      routerStub.post
        .withArgs('/', 'cursCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/curss/:id', function() {

    it('should route to curs.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'cursCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/curss/:id', function() {

    it('should route to curs.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'cursCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/curss/:id', function() {

    it('should route to curs.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'cursCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
