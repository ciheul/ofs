'use strict';

angular.module('ofsApp')
  .controller('EspCtrl', ['$scope', '$rootScope', '$http', '$routeParams', '$interval',
    function($scope, $rootScope, $http, $routeParams, $interval) {
      $scope.UnitId = $routeParams.UnitId.split('.')[1];

      var param = {unitId: $routeParams.UnitId};
      $scope.eventsAlarm = [];
      
      /*$http.get('http://teleconscada-web00.cloudapp.net:1980/api/espdetail/', {params: param})*/
      $scope.loadData = function (){
        $scope.prograssing = true;
        $http.get('/data/esp.json')
      	 .success(function(data) {
            $scope.prograssing = false;
        	  $scope.dataId = data;
          })
          .error(function() {
            $scope.prograssing = false;
            $scope.dataId = 0;
          });
      };
      $scope.spinData = $scope.loadData();
      
      $scope.pollDataEsp = $interval(function(){
      	$http.get('/data/esp.json', {params: param})
      	  .success(function(data) {
          	$scope.dataId = data;
          });
      }, 10000);
      $scope.loadAlarm = function (){
        $scope.prograssing = true;
        $http.get('/data/esp-active-alarm.json')
          .success(function(data){
            $scope.prograssing = false;
            $scope.eventsAlarm = data;
          })
          .error(function() {
            $scope.prograssing = false;
            $scope.eventsAlarm = 0;
          });
      };
      $scope.spinAlarms = $scope.loadAlarm();
      $scope.pollActiveAlarms = $interval(function() {
        // $http.get('http://teleconscada-web00.cloudapp.net:1980/api/ActiveAlarms')
        $http.get('/data/esp-active-alarm.json')
        .success(function(data) {
          $scope.eventsAlarm = data;
        });
      }, 10000);

       $http.get('')
        .success(function(data) {
          $scope.eventsHistoric = data;
        })
        .error(function(){
          $scope.eventsHistoric = 0;
        });

      $scope.filterAlarm = function(start, end) {
        start = start.replace(/\./g, '');
        end = end.replace(/\./g, '');
        var params = {dtfrom: start + '000000', dtto: end + '000000'};
        $http.get('http://teleconscada-web00.cloudapp.net:1980/api/HistoricalAlarms', {params: params})
        .success(function(data){
          $scope.eventsHistoric = data;
        });
      };

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
        $interval.cancel($scope.pollDataEsp);
        $interval.cancel($scope.pollActiveAlarms);
      }); 
    }]);
