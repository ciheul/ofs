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
        templateUrl: 'views/electrical-overview.html',
        controller: 'SubstationCtrl'
      })
      .when('/api/srpdetail/:UnitId', {
        templateUrl: 'views/srp-detail.html',
        controller: 'SrpCtrl'
      })
      .when('/api/espdetail/:UnitId', {
        templateUrl: 'views/esp-detail.html',
        controller: 'EspCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.defaults.useXDomain = true;
  }]);

