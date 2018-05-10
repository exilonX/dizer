'use strict';

describe('Controller: GrupaCtrl', function () {

  // load the controller's module
  beforeEach(module('dizerApp'));

  var GrupaCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GrupaCtrl = $controller('GrupaCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
