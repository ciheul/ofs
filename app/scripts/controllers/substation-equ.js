'use strict';

angular.module('ofsApp')
  .controller('EquCtrl', ['$scope', '$rootScope', '$http', '$routeParams', '$interval', 
    function($scope, $rootScope, $http, $routeParams, $interval) {
      // get SRP equipment name (ex: T150)
      $scope.Name = $routeParams.Name;

      var param = {name: $routeParams.Name};

      $http.get('', {params: param})
        .success(function(data) {
          $scope.dataId = data;
            
        });
      $scope.pollDataEqu = $interval(function(){
        $http.get('', {params: param})
        .success(function(data) {
          $scope.dataId = data;
        })
        .error(function() {
          $scope.dataId = '0';
        });
      }, 10000);
      
      $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.pollDataEqu);
      }); 
    }]);