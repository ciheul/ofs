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
        controller: 'WellOverviewCtrl'
      })
      .when('/electrical', {
        templateUrl: 'views/electrical-overview.html',
        controller: 'electricalCtrl'
      })
      .when('/api/srpdetail/:UnitId', {
        templateUrl: 'views/srp-detail.html',
        controller: 'srpCtrl'
      })
      .when('/api/espdetail/:UnitId', {
        templateUrl: 'views/esp-detail.html',
        controller: 'espCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.defaults.useXDomain = true;
  }]);

