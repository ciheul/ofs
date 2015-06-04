'use strict';

angular.module('ofsApp')
  .controller('TestCtrl', ['$scope', '$http', '$httpBackend',
    function($scope, $http) {
      
      $http.get('/data/well-active-alarm.json').success(function(result) {
        $scope.movies = result;
      });

    }]); 
