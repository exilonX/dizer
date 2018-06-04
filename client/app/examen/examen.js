'use strict';

angular.module('dizerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('examen', {
        url: '/examen',
        templateUrl: 'app/examen/examen.html',
        controller: 'ExamenCtrl'
      });
  });
