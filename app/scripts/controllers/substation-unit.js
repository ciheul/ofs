'use strict';

angular.module('ofsApp')
 .controller('UnitCtrl', ['$scope', '$rootScope', '$http', '$routeParams', '$interval', 'HTTP_INTERVAL',
    function($scope, $rootScope, $http, $routeParams, $interval, HTTP_INTERVAL) {
      $scope.Name = $routeParams.Name;

      /*var param = {name: $routeParams.Name};*/
      $scope.eventsAlarm = [];
      const ACTIVE_ALARM_ROWS = 12;
      const HISTORICAL_ALARM_ROWS = 12;
      /*$scope.isLoaded = false;*/
    
      /* plants get data */
      $scope.loadData = function (){
        $scope.prograssing = true;
        $http.get('/api/SubstationOverview/SubstationUnit')/*http://localhost:3000/api/wells*/
          .success(function(data) {
            $scope.prograssing = false;
            $scope.alert = false;
            $scope.isLoaded = true;
            $scope.unit = data;
          })
          .error(function(data){
            $scope.alert = data || 'Request Failed From Server';
            $scope.prograssing = false;
        });
      };
      $scope.spinData = $scope.loadData();
      
      $scope.pollSubstations = $interval(function() {
       $http.get('/api/SubstationOverview/SubstationUnit')/*http://localhost:3000/api/wells*/
        .success(function(data) {
          $scope.unit = data;
        });
      }, 10000);

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
            
            console.log('scope.eventsAlarm');
            console.log($scope.eventsAlarm);
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
        $scope.loadAlarm();
        // $http.get('/api/ActiveAlarms')
        // .success(function(data) {
        //   $scope.eventsAlarm = data;
        // });
      }, HTTP_INTERVAL);

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
      // when routes changes, cancel all interval operations
      $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.pollSubstations);
        $interval.cancel($scope.pollActiveAlarms);
      });
  }]);
