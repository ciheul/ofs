'use strict';

/**
 * @ngdoc overview
 * @name ofsApp
 * @description
 * # ofsApp
 *
 * Main module of the application.
 */
angular
  .module('ofsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
  ])
  .config(['$routeProvider','$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/well', {
        templateUrl: 'views/well-overview.html',
        controller: 'WellCtrl'
      })
      .when('/substation', {
        templateUrl: 'views/substation-overview.html',
        controller: 'SubstationCtrl'
      })
      .when('/api/srpdetail/:UnitId', {
        templateUrl: 'views/well-srp.html',
        controller: 'SrpCtrl'
      })
      .when('/api/espdetail/:UnitId', {
        templateUrl: 'views/well-esp.html',
        controller: 'EspCtrl'
      })
      .when('/st-detail', {
        templateUrl: 'views/unit-view-substation.html',
        controller: 'SubstationCtrl'
      })
      .when('/equipment', {
        templateUrl: 'views/equ-view.html',
        controller: 'SubstationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.defaults.useXDomain = true;
  }]);

