'use strict';

angular.module('dizerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cursant', {
        url: '/cursant',
        templateUrl: 'app/cursant/cursant.html',
        controller: 'CursantCtrl'
      });
  });
