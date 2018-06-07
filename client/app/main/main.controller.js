'use strict';

(function() {

class MainController {

  constructor(Auth, $http) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.getCurrentUser = Auth.getCurrentUser;
    this.$http = $http;
    this.awesomeThings = [];
    this.lista = []
    this.getLocuriOcupate();

    $http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
    });
  }

  getLocuriOcupate() {
    var ref = this;
    this.$http.get('/api/grupas/info').then(response => {
      var grupe = response.data;
      grupe.forEach(grupa => {
        this.$http.get('/api/curs/' + grupa.idCurs).then(response => {
          var curs = response.data;
          this.$http.get('/api/contracts/count/' + grupa._id).then(response => {
            var locuriOcupate = response.data;
            var res = {};
            res.denumireCurs = curs.denumireCurs;
            res.nrGrupa = grupa.nrGrupa;
            res.dataStart = grupa.dataStart;
            res.locuriOcupate = locuriOcupate;
            ref.lista.push(res);
          })
        })
      })
    })
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('dizerApp')
  .controller('MainController', MainController);

})();
