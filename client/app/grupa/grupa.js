'use strict';

angular.module('dizerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('grupa', {
        url: '/grupa',
        templateUrl: 'app/grupa/grupa.html',
        controller: 'GrupaCtrl'
      });
  });
