'use strict';

angular.module('ofsApp')
  .controller('EspCtrl', ['$scope', '$rootScope', '$http', '$routeParams', '$interval', 'HTTP_INTERVAL',
    function($scope, $rootScope, $http, $routeParams, $interval, HTTP_INTERVAL) {
      $scope.UnitId = $routeParams.UnitId.split('.')[1];

      var param = {unitId: $routeParams.UnitId};
      $scope.eventsAlarm = [];
      const ACTIVE_ALARM_ROWS = 10;
      const HISTORICAL_ALARM_ROWS = 9;


      /*$http.get('http://teleconscada-web00.cloudapp.net:1980/api/espdetail/', {params: param})*/
      /*spin loader esp data*/
      $scope.loadData = function (){
        $scope.prograssing = true;
        $http.get('/api/EspDetail/', { params: param })
      	 .success(function(data) {
            $scope.dataId = data;
            $scope.prograssing = false;
            $scope.alert = false;
          })
          .error(function(data) {
            $scope.alert = data ||'Request Failed from Server';
            $scope.prograssing = false;
          });
      };
      $scope.loadData();

      /*interval esp data*/
      $scope.pollDataEsp = $interval(function(){
      	/*$http.get('/api/EspDetail/', {params: param})
      	  .success(function(data) {*/
          	$scope.loadData();
          /*});*/
      }, 10000);

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
      }, 10000);

      /* interval Historical Alarm */
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
        $interval.cancel($scope.pollDataEsp);
        $interval.cancel($scope.pollActiveAlarms);
      }); 
    }]);
