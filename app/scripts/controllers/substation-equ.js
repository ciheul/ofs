'use strict';

angular.module('ofsApp')
  .controller('SubstationEquCtrl', ['$scope', '$rootScope', '$http', '$routeParams', '$interval', 
    function($scope, $rootScope, $http, $routeParams, $interval) {
      // get SRP equipment name (ex: T150)
      $scope.UnitId = $routeParams.UnitId.split('.')[1];

      var param = {unitId: $routeParams.UnitId};

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