'use strict';

/**
 * @ngdoc function
 * @name ofsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ofsApp
 */
angular.module('ofsApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
