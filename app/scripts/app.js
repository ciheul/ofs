'use strict';

/**
 * @ngdoc overview
 * @name ofsApp
 * @description
 * # ofsApp
 *
 * Main module of the application.
 */
var ofsApp = angular
  .module('ofsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ofsControllers'
  ])
  ofsApp.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
      .when('/well', {
        templateUrl: 'views/well-overview.html',
        controller: 'ofsListCtrl'
      })
      .when('/electrical', {
        templateUrl: 'views/electrical-overview.html',
        controller: 'electricalCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
