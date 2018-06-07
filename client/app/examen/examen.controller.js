'use strict';

angular.module('dizerApp')
  .controller('ExamenCtrl', function ($scope, $http) {
    $scope.examen = {};
    $scope.lista = [];
    $scope.cursanti = [];
    $scope.submitted = false;
    var API = '/api/examens/';
    $scope.updateFlag = false;

    $scope.getCursanti = function() {
      return $http.get('/api/cursants').then(response => {
        $scope.cursanti = response.data;
        return response.data.map(function(item) {
          return item.nume + " " + item.prenume;
        });
      });
    };

    $scope.selectCursanti = function(item) {
      for(var i in $scope.cursanti) {
        var c = $scope.cursanti[i];
        if ((c.nume + " " + c.prenume) == item) {
          $scope.examen.idCursant = c._id;
        }
      }
    };

    $scope.getDenumireCursant = function(id) {
      for(var c in $scope.cursanti) {
        if ($scope.cursanti[c]._id == id) {
          return $scope.cursanti[c].nume + " " + $scope.cursanti[c].prenume;
        }
      }
    };

    $scope.cauta = function() {
      var obj = Object.assign($scope.examen);
      delete obj.numeCursant;
      $http.post(API + "search", obj)
        .then(function(response) {
          $scope.lista = response.data;
          for (var c in $scope.lista) {
            $scope.lista[c].numeCursant = $scope.getDenumireCursant($scope.lista[c].idCursant);
          }
        });
    };

    $scope.adauga = function(form) {
      $scope.submitted = true;
      if (form.$valid) {
        $http.post(API, $scope.examen).then(response => {
          if (response.data) {
            var obj = response.data;
            obj.numeCursant = $scope.getDenumireCursant(obj.idCursant);
            $scope.lista.push(obj);
          }
          $scope.examen = {};
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
      $http.get('/api/cursants').then(response => {
        $scope.cursanti = response.data;
        $http.get(API).then(response => {
          $scope.lista = response.data;
          for (var c in $scope.lista) {
            $scope.lista[c].numeCursant = $scope.getDenumireCursant($scope.lista[c].idCursant);
          }
        });
      });
    };

    $scope.modifica = function(id) {
      for(var i in $scope.lista) {
        var c = $scope.lista[i];
        if (c._id == id) {
          $scope.examen = c;
          $scope.updateFlag = true;
          break;
        }
      }
    };

    $scope.salveaza_modificari = function() {
      $http.put(API + $scope.examen._id, $scope.examen).then(response => {
        $scope.get();
        $scope.updateFlag = false;
        $scope.examen = {};
      });
    };

    // Get the initial data
    $scope.get();

  });
