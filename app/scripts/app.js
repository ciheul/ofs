'use strict';

/**
 * @ngdoc overview
 * @name ofsApp
 * @description
 * # ofsApp
 *
 * Main module of the application.
 */
angular.module('ofsApp', [
    'ngResource',
    'ngRoute',
    'angularSpinner',
    'angular-spinkit',
    'ngStorage',
  ])
  .constant('HOST', {
    DEBUG: true,
    BASE_URL: 'http://localhost',
    PORT:3000 
    // BASE_URL: 'http://teleconscada-web00.cloudapp.net',
    // PORT: 1980
  })
  .constant('HTTP_INTERVAL', 10000)
  .config(['$routeProvider','$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
      })
      .when('/well', {
        templateUrl: 'views/well-overview.html',
        controller: 'WellCtrl',
      })
      .when('/substation', {
        templateUrl: 'views/substation-overview.html',
        controller: 'SubstationCtrl',
      })
      .when('/api/srpdetail/:UnitId', {
        templateUrl: 'views/well-srp.html',
        controller: 'SrpCtrl',
      })
      .when('/api/espdetail/:UnitId', {
        templateUrl: 'views/well-esp.html',
        controller: 'EspCtrl',
      })
      .when('/st-detail/:Name', {
        templateUrl: 'views/substation-unit-view.html',
        controller: 'UnitCtrl',
      })
      .when('/st-equipment/:Name', {
        templateUrl: 'views/substation-equ-view.html',
        controller: 'EquCtrl',
      })
      .otherwise({
        redirectTo: '/login'
      });

    $httpProvider.defaults.useXDomain = true;
    $httpProvider.interceptors.push('httpGlobalUrlModifier');
  }]);

