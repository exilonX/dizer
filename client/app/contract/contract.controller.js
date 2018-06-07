'use strict';

angular.module('dizerApp')
  .controller('ContractCtrl', function ($scope, $http) {
    $scope.contract = {};
    $scope.lista = [];
    $scope.cursanti = [];
    $scope.grupe = []
    $scope.submitted = false;
    var API = '/api/contracts/';
    $scope.updateFlag = false;

    $scope.getCursanti = function() {
      return $http.get('/api/cursants').then(response => {
        $scope.cursanti = response.data;
        return response.data.map(function(item) {
          return item.nume + " " + item.prenume;
        });
      });
    };

    $scope.getGrupe = function() {
      return $http.get('/api/grupas').then(response => {
        $scope.grupe = response.data;
        return response.data.map(function(item) {
          return item.nrGrupa;
        });
      });
    };

    $scope.selectCursanti = function(item) {
      for(var i in $scope.cursanti) {
        var c = $scope.cursanti[i];
        if ((c.nume + " " + c.prenume) == item) {
          $scope.contract.idCursant = c._id;
        }
      }
    };


    $scope.selectGrupe = function(item) {
      for(var i in $scope.grupe) {
        var c = $scope.grupe[i];
        if (c.nrGrupa == item) {
          $scope.contract.idGrupa = c._id;
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

    $scope.getDenumireGrupa = function(id) {
      for(var c in $scope.grupe) {
        if ($scope.grupe[c]._id == id) {
          return $scope.grupe[c].nrGrupa;
        }
      }
    };

    $scope.cauta = function() {
      var obj = Object.assign($scope.contract);
      delete obj.numeCursant;
      delete obj.numeGrupa;
      $http.post(API + "search", obj)
        .then(function(response) {
          $scope.lista = response.data;
          for (var c in $scope.lista) {
            $scope.lista[c].numeCursant = $scope.getDenumireCursant($scope.lista[c].idCursant);
            $scope.lista[c].numeGrupa = $scope.getDenumireGrupa($scope.lista[c].idGrupa);
          }
        });
    };

    $scope.adauga = function(form) {
      $scope.submitted = true;
      if (form.$valid) {
        $http.post(API, $scope.contract).then(response => {
          if (response.data) {
            var obj = response.data;
            obj.numeCursant = $scope.getDenumireCursant(obj.idCursant);
            obj.numeGrupa = $scope.getDenumireGrupa(obj.idGrupa);
            $scope.lista.push(obj);
          }
          $scope.contract = {};
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
        $http.get('/api/grupas').then(response => {
          $scope.grupe = response.data;
          $http.get(API).then(response => {
            $scope.lista = response.data;
            for (var c in $scope.lista) {
              $scope.lista[c].numeCursant = $scope.getDenumireCursant($scope.lista[c].idCursant);
              $scope.lista[c].numeGrupa = $scope.getDenumireGrupa($scope.lista[c].idGrupa);
            }
          });
        });

      });
    };

    $scope.modifica = function(id) {
      for(var i in $scope.lista) {
        var c = $scope.lista[i];
        if (c._id == id) {
          $scope.contract = c;
          $scope.updateFlag = true;
          if (c["dataContract"])
            $scope.contract["dataStop"] = new Date(c["dataContract"]);
          break;
        }
      }
    };

    $scope.salveaza_modificari = function() {
      $http.put(API + $scope.contract._id, $scope.contract).then(response => {
        $scope.get();
        $scope.updateFlag = false;
        $scope.contract = {};
      });
    };

    // Get the initial data
    $scope.get();

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };
  });
