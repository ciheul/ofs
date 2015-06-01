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
  ])
  .config(['$routeProvider','$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/well', {
        templateUrl: 'views/well-overview.html',
        controller: 'WellCtrl',
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
      .when('/api/st-detail/:Name', {
        templateUrl: 'views/substation-unit-view.html',
        controller: 'SubstationUnitCtrl'
      })
      .when('/equipment', {
        templateUrl: 'views/substation-equ-view.html',
        controller: 'SubstationEquCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.defaults.useXDomain = true;
  }]);

