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
      }, 10000);

      $http.get('/data/esp-active-alarm.json')
        .success(function(data){
          $scope.eventsAlarm = data;
        });

      $scope.pollActiveAlarms = $interval(function() {
        // $http.get('http://teleconscada-web00.cloudapp.net:1980/api/ActiveAlarms')
        $http.get('/data/esp-active-alarm.json')
        .success(function(data) {
          $scope.eventsAlarm = data;
        });
      }, 10000);

      $scope.getCount = function(){
        return $scope.eventsAlarm.length;
        /*return 0;*/
      };

      $scope.count = function(){
        $rootScope.$broadcast('ping',{
          ping:$scope.getCount
        });
      };

      $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.pollDataSrp);
        $interval.cancel($scope.pollActiveAlarms);
      }); 
    }]);
