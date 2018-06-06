'use strict';

angular.module('dizerApp')
  .controller('CursantCtrl', function ($scope, $http) {
    $scope.cursant = {};
    $scope.lista = [];
    $scope.submitted = false;
    var API = '/api/cursants/';
    $scope.updateFlag = false;

    $scope.cauta = function() {
      $http.post(API + "search", $scope.cursant)
        .then(function(response) {
          $scope.lista = response.data;
        });
    };

    $scope.adauga = function(form) {
      $http.post(API, $scope.cursant).then(response => {
        if (response.data)
          $scope.lista.push(response.data)
        $scope.cursant = {};
      });
    };

    $scope.sterge = function(id) {
      console.log("Stergere", id);
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
          $scope.cursant = c;
          $scope.cursant["dataCI"] = new Date(c["dataCI"]);
          $scope.updateFlag = true;
          break;
        }
      }
    };

    $scope.salveaza_modificari = function() {
      $http.put(API + $scope.cursant._id, $scope.cursant).then(response => {
        $scope.get();
        $scope.updateFlag = false;
        $scope.cursant = {};
      });
    };

    // Get the initial data
    $scope.get();


    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };


  });
