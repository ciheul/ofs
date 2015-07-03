'use strict';

angular.module('ofsApp')
  .controller('AlarmCtrl', ['$scope', '$rootScope', '$http', '$interval', '$sessionStorage', 'HTTP_INTERVAL',
    function($scope, $rootScope, $http, $interval, $sessionStorage, HTTP_INTERVAL) {
      
      const ACTIVE_ALARM_ROWS = 12;
      const HISTORICAL_ALARM_ROWS = 12;

      /*spin active alarm*/
      $scope.eventsAlarm = [];
      $scope.loadAlarm = function() {
        $scope.isActiveProgressing = true;
        /* interval Active Alarm */
        $http.get('/api/ActiveAlarms')
          .success(function(data) {
            $scope.isActiveProgressing = false;

            // to make the fixed table, fill with empty rows
            $scope.activeAlarmLength = data.length;
            if (data.length !== ACTIVE_ALARM_ROWS) {
              var emptyObj = { Date: '', Time: '', Equipment: '', Message: '' };
              var numRepeat = ACTIVE_ALARM_ROWS - data.length;
              for (var i = 0; i < numRepeat; i++) {
                data.push(emptyObj);
              } 
            }

            // $scope.eventsAlarm = [];
            $scope.eventsAlarm = data;
            $sessionStorage.alarm = $scope.eventsAlarm;
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
            $scope.eventsAlarm = $sessionStorage.alarm;
            /*console.log($scope.eventsAlarm);*/
            $scope.isActiveProgressing = false;

            if (data === null && $scope.eventsAlarm.length === 0) {
              var emptyObj = { Date: '', Time: '', Equipment: '', Message: '' };
              for (var i = 0; i < ACTIVE_ALARM_ROWS; i++) {
                $scope.eventsAlarm.push(emptyObj);
              } 
            }
          });
      };
      $scope.loadAlarm();

      /*interval active alarm*/
      $scope.pollActiveAlarms = $interval(function() {
        $scope.loadAlarm();
      }, HTTP_INTERVAL);

      /* interval Historical Alarm */
      $scope.eventsHistoric = [];
      // $http.get('http://teleconscada-web00.cloudapp.net:1980/api/HistoricalAlarms')
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
          /*$sessionStorage.alarmHistorical = $scope.eventsHistoric;*/
        })
        .error(function(data) {
          if (data === null) {
            var emptyObj = { Date: '', Time: '', Equipment: '', Message: '' };
            for (var i = 0; i < HISTORICAL_ALARM_ROWS; i++) {
              $scope.eventsHistoric.push(emptyObj);
            } 
          }
        });

      $scope.filterAlarm = function(start, end) {
        $scope.isHistoricalProgressing = true;
        start = start.replace(/\./g, '');
        end = end.replace(/\./g, '');
        var params = {dtfrom: start + '000000', dtto: end + '000000'};
        $http.get('/api/HistoricalAlarms', {params: params})
          .success(function(data){
            /*$scope.eventsHistoric = $sessionStorage.alarmHistorical;
            console.log($scope.eventsHistoric);*/
            $scope.isHistoricalProgressing = false;

            if (data.length !== HISTORICAL_ALARM_ROWS) {
              var emptyObj = {Date: '', Time: '', Equipment: '', Message: ''};
              var numRepeat = HISTORICAL_ALARM_ROWS - data.length;
              for (var i = 0; i < numRepeat; i++) {
                data.push(emptyObj);
              } 
            }
            $scope.eventsHistoric = data;
          })
          .error(function(data) {
            data = null;
            $scope.isHistoricalProgressing = false;
          });
      };

      // when routes changes, cancel all interval operations
      $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.pollActiveAlarms);
      });
    }
  ]);
