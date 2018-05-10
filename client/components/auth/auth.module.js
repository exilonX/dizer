'use strict';

angular.module('dizerApp.auth', [
  'dizerApp.constants',
  'dizerApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
