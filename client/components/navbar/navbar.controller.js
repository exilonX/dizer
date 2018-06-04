'use strict';

class NavbarController {
  //start-non-standard
  menu = [
    {
      'title' : 'Curs',
      'state' : 'curs'
    },
    {
      'title' : 'Grupe',
      'state' : 'grupa'
    },
    {
      'title' : 'Examen',
      'state' : 'examen'
    },
    {
      'title' : 'Cursanti',
      'state' : 'cursant'
    },
    {
      'title' : 'Facturi',
      'state' : 'factura'
    },
    {
      'title' : 'Contracte',
      'state' : 'contract'
    }
  ];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('dizerApp')
  .controller('NavbarController', NavbarController);
