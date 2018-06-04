'use strict';

angular.module('dizerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('curs', {
        url: '/curs',
        templateUrl: 'app/curs/curs.html',
        controller: 'CursCtrl'
      });
  });
