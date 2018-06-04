'use strict';

describe('Controller: ExamenCtrl', function () {

  // load the controller's module
  beforeEach(module('dizerApp'));

  var ExamenCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExamenCtrl = $controller('ExamenCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
