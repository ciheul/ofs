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
  .config(['$routeProvider','$httpProvider',function ($routeProvider, $httpProvider) {
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
    $httpProvider
      .defaults
        .useXDomain = true;
    $httpProvider
      .defaults
        .headers
          .common['Access-Control-Allow-Origin: *'];
  }]);

