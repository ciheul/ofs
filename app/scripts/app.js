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
    'ofsControllers'
  ])
  .config(['$routeProvider','$httpProvider',function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/well-overview.html',
          controller: 'ofsListCtrl'
      })
      .when('/electrical', {
        templateUrl: 'views/electrical-overview.html',
        controller: 'electricalCtrl'
      })
      .when('/srp-detail', {
        templateUrl: 'views/srp-detail.html',
        controller: 'srpCtrl'
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
          .common['X-Requested-With']= 'XMLHttpRequest';
  }]);

