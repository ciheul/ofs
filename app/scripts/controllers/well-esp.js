'use strict';

angular.module('ofsApp')
  .controller('EspCtrl', ['$scope', '$rootScope', '$http', '$routeParams', '$interval',
    function($scope, $rootScope, $http, $routeParams, $interval) {
      $scope.UnitId = $routeParams.UnitId.split('.')[1];

      var param = {unitId: $routeParams.UnitId};
      $scope.eventsAlarm = [];
      
      /*$http.get('http://teleconscada-web00.cloudapp.net:1980/api/espdetail/', {params: param})*/
      /*spin loader esp data*/
      $scope.loadData = function (){
        $scope.prograssing = true;
        $http.get('/api/Esp/', { params: param })
      	 .success(function(data) {
            $scope.dataId = data;
            $scope.prograssing = false;
          })
          .error(function(data) {
            $scope.dataId = data || 
            [
              {
                'msg': 'Request Failed from Server'
              }
            ];
            console.log('debug');
            $scope.prograssing = false;
          });
      };
      $scope.spinData = $scope.loadData();
      
      /*interval esp data*/
      $scope.pollDataEsp = $interval(function(){
      	$http.get('/api/Esp/', {params: param})
      	  .success(function(data) {
          	$scope.dataId = data;
          });
      }, 10000);

      /*spin loader active alarm*/
      $scope.loadAlarm = function (){
        $scope.prograssing = true;
        $http.get('/api/Srp/ActiveAlarms')
          .success(function(data){
            $scope.eventsAlarm = data;
            $scope.prograssing = false;

            $scope.getCount = function(){
              return $scope.eventsAlarm.length;
            };

            $scope.count = function(){
              $rootScope.$broadcast('ping',{
                ping:$scope.getCount
              });
            };
          })
          .error(function(data) {
            $scope.eventsAlarm = data || 'Request Failed from Server';
            $scope.prograssing = false;
          });
      };
      $scope.spinAlarms = $scope.loadAlarm();

      /*interval active alarm*/
      $scope.pollActiveAlarms = $interval(function() {
        // $http.get('http://teleconscada-web00.cloudapp.net:1980/api/ActiveAlarms')
        $http.get('/api/Srp/ActiveAlarms')
        .success(function(data) {
          $scope.eventsAlarm = data;
        });
      }, 10000);

      /*historical alarm*/
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

      $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.pollDataEsp);
        $interval.cancel($scope.pollActiveAlarms);
      }); 
    }]);
