'use strict';

angular.module('dizerApp')
  .controller('CursantCtrl', function ($scope, $http) {
    $scope.cursant = {};
    $scope.lista = [];
    $scope.submitted = false;
    var API = '/api/cursants/';


    $scope.cauta = function() {
      $http.post(API + "search", $scope.cursant)
        .then(function(response) {
          $scope.lista = response.data;
        });
    };

    $scope.adauga = function(form) {
      $http.post(API, $scope.cursant);
      $scope.lista.push($scope.cursant);
      $scope.cursant = {};

    };

    $scope.sterge = function(id) {
      console.log("Stergere", id);
      $http.delete(API + id).then(response => {
        $scope.get();
      })
    }

    $scope.get = function() {
      $http.get(API).then(response => {
        $scope.lista = response.data;
      });
    }

    // Get the initial data
    $scope.get();


    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };


  });
