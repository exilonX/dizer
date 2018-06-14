'use strict';

angular.module('dizerApp')
  .controller('GrupaCtrl', function ($scope, $http) {
    $scope.grupa = {};
    $scope.lista = [];
    $scope.cursuri = [];
    $scope.submitted = false;
    var API = '/api/grupas/';
    $scope.updateFlag = false;
    $scope.selectFlag = false;

    $scope.getCursuri = function(value) {
      return $http.get('/api/curs/regex/' + value).then(response => {
        $scope.cursuri = response.data;
        return response.data.map(function(item) {
          return item.denumireCurs;
        });
      });
    };

    $scope.selectCurs = function(item) {
      for(var i in $scope.cursuri) {
        var c = $scope.cursuri[i];
        if (c.denumireCurs == item) {
          $scope.grupa.idCurs = c._id;
          $scope.selectFlag = true;
        }
      }
    };

    $scope.getDenumireCurs = function(id) {
      for(var c in $scope.cursuri) {
        if ($scope.cursuri[c]._id == id) {
          return $scope.cursuri[c].denumireCurs;
        }
      }
    }

    $scope.cauta = function() {
      var obj = Object.assign($scope.grupa);
      delete obj.cursDenumire;
      $http.post(API + "search", obj)
        .then(function(response) {
          $scope.lista = response.data;
          for (var c in $scope.lista) {
            $scope.lista[c].cursDenumire = $scope.getDenumireCurs($scope.lista[c].idCurs);
          }
        });
    };

    $scope.adauga = function(form) {
      $scope.submitted = true;
      if (form.$valid && $scope.selectFlag) {

        $http.post(API, $scope.grupa).then(response => {
          if (response.data) {
            var obj = response.data;
            obj.cursDenumire = $scope.getDenumireCurs(obj.idCurs);
            $scope.lista.push(obj);
          }
          $scope.grupa = {};
          $scope.submitted = false;
          $scope.selectFlag = false;

        });
      }
    };

    $scope.sterge = function(id) {
      $http.delete(API + id).then(response => {
        $scope.get();
      })
    };

    $scope.get = function() {
      $http.get('/api/curs').then(response => {
        $scope.cursuri = response.data;
        $http.get(API).then(response => {
          $scope.lista = response.data;
          for (var c in $scope.lista) {
            $scope.lista[c].cursDenumire = $scope.getDenumireCurs($scope.lista[c].idCurs);
          }
        });
      });

    };

    $scope.modifica = function(id) {
      for(var i in $scope.lista) {
        var c = $scope.lista[i];
        if (c._id == id) {
          $scope.grupa = c;
          if(c["dataStart"])
            $scope.grupa["dataStart"] = new Date(c["dataStart"]);
          if (c["dataStop"])
            $scope.grupa["dataStop"] = new Date(c["dataStop"]);
          $scope.updateFlag = true;
          break;
        }
      }
    };

    $scope.salveaza_modificari = function() {
      $http.put(API + $scope.grupa._id, $scope.grupa).then(response => {
        $scope.get();
        $scope.updateFlag = false;
        $scope.grupa = {};
      });
    };

    // Get the initial data
    $scope.get();


    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };


  });
