'use strict';

describe('Controller: CursantCtrl', function () {

  // load the controller's module
  beforeEach(module('dizerApp'));

  var CursantCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CursantCtrl = $controller('CursantCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
