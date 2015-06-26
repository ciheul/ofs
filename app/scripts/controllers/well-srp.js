'use strict';

angular.module('ofsApp')
  .controller('SrpCtrl', ['$scope', '$rootScope', '$http', '$routeParams',
    '$interval', 'HTTP_INTERVAL',
    function($scope, $rootScope, $http, $routeParams, $interval, HTTP_INTERVAL) {
      // get SRP equipment name (ex: T150)
      $scope.UnitId = $routeParams.UnitId.split('.')[1];

      var param = { UnitId: $routeParams.UnitId };

      $scope.eventsAlarm = [];
      const ACTIVE_ALARM_ROWS = 10;
      const HISTORICAL_ALARM_ROWS = 9;

      /*spin loader data srp*/
      $scope.loadData = function (){
        $scope.prograssing = true;
        /*$http.get('http://teleconscada-web00.cloudapp.net:1980/api/srpdetail/', {params: param})*/
        $http.get('api/SrpDetail/', { params: param })
      	 .success(function(data) {
        	  $scope.dataId = data;
            $scope.alert = false;
            $scope.prograssing = false;
          })
          .error(function(data) {
            $scope.alert = data ||'Request Failed from Server';
            $scope.prograssing = false;
          });
      };
      $scope.loadData();

      /*interval data srp*/
      $scope.pollDataSrp = $interval(function(){
        /*$http.get('http://teleconscada-web00.cloudapp.net:1980/api/srpdetail/', {params: param})*/
        /*$http.get('/api/SrpDetail/', { params: param })
          .success(function(data) {*/
            $scope.loadData();
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
        //$http.get('', { params: params })
        $http.get('http://localhost:28000/data/trend.json')
          .success(function(data) {
            $scope.dataTrend = data;
          });
      };

      /*spin loader active alarm*/
      /*spin active alarm*/
      $scope.loadAlarm = function() {
        $scope.prograssing = true;
        /* interval Active Alarm */
        // $http.get('http://teleconscada-web00.cloudapp.net:1980/api/ActiveAlarms')
        $http.get('/api/ActiveAlarms')
          .success(function(data) {
            // to make the fixed table, fill with empty rows
            $scope.activeAlarmLength = data.length;
            if (data.length !== ACTIVE_ALARM_ROWS) {
              var emptyObj = {Date: '', Time: '', Equipment: '', Message: ''};
              var numRepeat = ACTIVE_ALARM_ROWS - data.length;
              for (var i = 0; i < numRepeat; i++) {
                data.push(emptyObj);
              } 
            }

            $scope.eventsAlarm = data;
            
            $scope.prograssing = false;

            $scope.getCount = function() {
              // return $scope.eventsAlarm.length;
              return $scope.activeAlarmLength;
            };

            $scope.count = function() {
              $rootScope.$broadcast('ping', {
                ping: $scope.getCount
              });
            };
          })
          .error(function(data) {
            $scope.prograssing = false;
          });
      };
      $scope.loadAlarm();

      /*interval active alarm*/
      $scope.pollActiveAlarms = $interval(function() {
        // $http.get('http://teleconscada-web00.cloudapp.net:1980/api/ActiveAlarms')
        // $http.get('/api/ActiveAlarms')
        // .success(function(data) {
          $scope.loadAlarm();
        // });
      }, HTTP_INTERVAL);

      $http.get('/api/HistoricalAlarms')
        .success(function(data) {
          if (data.length !== HISTORICAL_ALARM_ROWS) {
            var emptyObj = {Date: '', Time: '', Equipment: '', Message: ''};
            var numRepeat = HISTORICAL_ALARM_ROWS - data.length;
            for (var i = 0; i < numRepeat; i++) {
              data.push(emptyObj);
            } 
          }
          $scope.eventsHistoric = data;
        })
        .error(function() {
          $scope.eventsHistoric = 0;
        });

      $scope.filterAlarm = function(start, end) {
        $scope.isHistoricalProgressing = true;
        start = start.replace(/\./g, '');
        end = end.replace(/\./g, '');
        var params = {dtfrom: start + '000000', dtto: end + '000000'};
        $http.get('/api/HistoricalAlarms', {params: params})
        .success(function(data){
          $scope.isHistoricalProgressing = false;

          if (data.length !== HISTORICAL_ALARM_ROWS) {
            var emptyObj = {Date: '', Time: '', Equipment: '', Message: ''};
            var numRepeat = HISTORICAL_ALARM_ROWS - data.length;
            for (var i = 0; i < numRepeat; i++) {
              data.push(emptyObj);
            } 
          }
          $scope.eventsHistoric = data;
        });
      };

      $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.pollDataSrp);
        $interval.cancel($scope.pollActiveAlarms);
      });
  }]);
