'use strict';

describe('Controller: ControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('dizerApp'));

  var ControllerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ControllerCtrl = $controller('ControllerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
