'use strict';

angular.module('ofsApp')
  .controller('EspCtrl', ['$scope', '$rootScope', '$http', '$routeParams', '$interval', 
    function($scope, $rootScope, $http, $routeParams, $interval) {
      $scope.UnitId = $routeParams.UnitId.split('.')[1];

      var param = {unitId: $routeParams.UnitId};

      $http.get('http://teleconscada-web00.cloudapp.net:1980/api/espdetail/', {params: param})
      	.success(function(data) {
        	$scope.dataId = data;
        });

      $scope.pollDataEsp = $interval(function(){
      	$http.get('http://teleconscada-web00.cloudapp.net:1980/api/espdetail/', {params: param})
      	  .success(function(data) {
          	$scope.dataId = data;
          })
          .error(function() {
            $scope.dataId = '0';
          });
      }, 100000000000000000);

      $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.pollDataSrp);
      }); 
    }]);
