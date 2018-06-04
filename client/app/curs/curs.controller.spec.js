'use strict';

describe('Controller: CursCtrl', function () {

  // load the controller's module
  beforeEach(module('dizerApp'));

  var CursCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CursCtrl = $controller('CursCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
