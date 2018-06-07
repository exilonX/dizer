'use strict';

angular.module('dizerApp')
  .controller('FacturaCtrl', function ($scope, $http) {
    $scope.factura = {};
    $scope.lista = [];
    $scope.contracte = [];
    $scope.submitted = false;
    var API = '/api/facturas/';
    $scope.updateFlag = false;

    $scope.getContracts = function () {
      return $http.get('/api/contracts').then(function (response) {
        $scope.contracte = response.data;
        return response.data.map(function (item) {
          return item.nrContract;
        });
      });
    };

    $scope.selectContracts = function (item) {
      for (var i in $scope.contracte) {
        var c = $scope.contracte[i];
        if (c.nrContract == item) {
          $scope.factura.idContract = c._id;
        }
      }
    };

    $scope.getDenumireContract = function (id) {
      for (var c in $scope.contracte) {
        if ($scope.contracte[c]._id == id) {
          return $scope.contracte[c].nrContract;
        }
      }
    };

    $scope.cauta = function () {
      var obj = Object.assign($scope.factura);
      delete obj.numarContract;
      $http.post(API + "search", obj).then(function (response) {
        $scope.lista = response.data;
        for (var c in $scope.lista) {
          $scope.lista[c].numarContract = $scope.getDenumireContract($scope.lista[c].idContract);
        }
      });
    };

    $scope.adauga = function (form) {
      $scope.submitted = true;
      if (form.$valid) {
        $http.post(API, $scope.factura).then(function (response) {
          if (response.data) {
            var obj = response.data;
            obj.numarContract = $scope.getDenumireContract(obj.idContract);
            $scope.lista.push(obj);
          }
          $scope.factura = {};
          $scope.submitted = false;
        });
      }
    };

    $scope.sterge = function (id) {
      $http['delete'](API + id).then(function (response) {
        $scope.get();
      });
    };

    $scope.get = function () {
      $http.get('/api/contracts').then(function (response) {
        $scope.contracte = response.data;
        $http.get(API).then(function (response) {
          $scope.lista = response.data;
          for (var c in $scope.lista) {
            $scope.lista[c].numarContract = $scope.getDenumireContract($scope.lista[c].idContract);
          }
        });
      });
    };

    $scope.modifica = function (id) {
      for (var i in $scope.lista) {
        var c = $scope.lista[i];
        if (c._id == id) {
          $scope.factura = c;
          $scope.updateFlag = true;
          if (c["dataFactura"])
            $scope.factura["dataFactura"] = new Date(c["dataFactura"]);
          if (c["dataPlata"])
            $scope.factura["dataPlata"] = new Date(c["dataPlata"]);
          break;
        }
      }
    };

    $scope.salveaza_modificari = function () {
      $http.put(API + $scope.factura._id, $scope.factura).then(function (response) {
        $scope.get();
        $scope.updateFlag = false;
        $scope.factura = {};
      });
    };

    // Get the initial data
    $scope.get();

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };
  });
