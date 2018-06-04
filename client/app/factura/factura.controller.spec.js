'use strict';

describe('Controller: FacturaCtrl', function () {

  // load the controller's module
  beforeEach(module('dizerApp'));

  var FacturaCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FacturaCtrl = $controller('FacturaCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
