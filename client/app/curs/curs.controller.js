'use strict';

angular.module('dizerApp')
  .controller('CursCtrl', function ($scope, $http) {
    $scope.curs = {};
    $scope.lista = [];
    $scope.submitted = false;
    var API = '/api/curs/';
    $scope.updateFlag = false;

    $scope.cauta = function() {
      $http.post(API + "search", $scope.curs)
        .then(function(response) {
          $scope.lista = response.data;
        });
    };

    $scope.adauga = function(form) {
      $scope.submitted = true;
      if (form.$valid) {
        $http.post(API, $scope.curs).then(response => {
          if (response.data)
            $scope.lista.push(response.data);
          $scope.curs = {};
          $scope.submitted = false;
        });
      }
    };

    $scope.sterge = function(id) {
      $http.delete(API + id).then(response => {
        $scope.get();
      })
    };

    $scope.get = function() {
      $http.get(API).then(response => {
        $scope.lista = response.data;
      });
    };

    $scope.modifica = function(id) {
      for(var i in $scope.lista) {
        var c = $scope.lista[i];
        if (c._id == id) {
          $scope.curs = c;
          $scope.updateFlag = true;
          break;
        }
      }
    };

    $scope.salveaza_modificari = function() {
      $http.put(API + $scope.curs._id, $scope.curs).then(response => {
        $scope.get();
        $scope.updateFlag = false;
        $scope.curs = {};
      });
    };

    // Get the initial data
    $scope.get();

  });
