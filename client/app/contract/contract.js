'use strict';

angular.module('dizerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('contract', {
        url: '/contract',
        templateUrl: 'app/contract/contract.html',
        controller: 'ContractCtrl'
      });
  });
