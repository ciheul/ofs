'use strict';

angular.module('ofsApp')
  .controller('SrpCtrl', ['$scope', '$rootScope', '$http', '$routeParams',
    '$interval', 'HTTP_INTERVAL',
    function($scope, $rootScope, $http, $routeParams, $interval, HTTP_INTERVAL) {
      // get SRP equipment name (ex: T150)
      $scope.UnitId = $routeParams.UnitId.split('.')[1];

      var param = { unitId: $routeParams.UnitId };

      $scope.eventsAlarm = [];
      
      /*spin loader data srp*/
      $scope.loadData = function (){
        $scope.prograssing = true;
        /*$http.get('http://teleconscada-web00.cloudapp.net:1980/api/srpdetail/', {params: param})*/
        $http.get('api/Srp/', { params: param })
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

      /*interval data srp*/
      $scope.pollDataSrp = $interval(function(){
        /*$http.get('http://teleconscada-web00.cloudapp.net:1980/api/srpdetail/', {params: param})*/
        $http.get('/api/Srp/', { params: param })
          .success(function(data) {
            $scope.dataId = data;
          });
      }, HTTP_INTERVAL);

      /*trending*/
      $scope.filterTrending = function(startTrend, endTrend) {
        startTrend = startTrend.replace(/\./g, '');
        endTrend = endTrend.replace(/\./g, '');

        var params = {
          unitId: $routeParams.UnitId,
          dtfrom: startTrend + '000000',
          dtto: endTrend + '000000'
        };

        //http://teleconscada-web00.cloudapp.net:1980/api/SRPTrending/?unitId=EPTJ%5COW.T150&dtfrom=20150506160000&dtto=20150507160000
        $http.get('', { params: params })
          .success(function(data) {
            $scope.dataTrend = data;
          });
      };

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

      /*interva; active alarm*/
      $scope.pollActiveAlarms = $interval(function() {
        // $http.get('http://teleconscada-web00.cloudapp.net:1980/api/ActiveAlarms')
        $http.get('/api/Srp/ActiveAlarms')
        .success(function(data) {
          $scope.eventsAlarm = data;
        });
      }, 10000);

      /*Historical Alarm*/
      $http.get('')
        .success(function(data) {
          $scope.eventsHistoric = data;
        })
        .error(function() {
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
        $interval.cancel($scope.pollDataSrp);
        $interval.cancel($scope.pollActiveAlarms);
      });
  }]);
