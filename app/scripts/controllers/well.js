'use strict';

angular.module('ofsApp')
  .controller('WellCtrl', ['$scope', '$rootScope', '$http', '$interval',
      'HTTP_INTERVAL',
    function($scope, $rootScope, $http, $interval, HTTP_INTERVAL) {

      // var map = null;
      const TILE_COL = 4;
      const PLANT_PER_GROUP = 3;
      const ACTIVE_ALARM_ROWS = 10;
      const HISTORICAL_ALARM_ROWS = 9;

      $scope.groups = [];
      $scope.eventsAlarm = [];

      // $scope.GetMap = function(){
      //   // console.log('debug"');
      //   map = new Microsoft.Maps.Map(document.getElementById('mapDiv'), {credentials: 'AmSRI0ujkP_9tyTGJVQxuuXTEnX6dumwkQyflm7aqzbOCLVZ-lRGRosGueF8Cf2v', center: new Microsoft.Maps.Location(47.5, -122.3), zoom: 9 });
      //
      //   Microsoft.Maps.loadModule('Microsoft.Maps.Search');
      // };
      //
      // function searchModuleLoaded() {
      //   var searchManager = new Microsoft.Maps.Search.SearchManager(map);
      //
      //   #<{(|var searchRequest = {query:"pizza in Seattle, WA", count: 5, callback:searchCallback, errorCallback:searchError};
      //   searchManager.search(searchRequest);|)}>#
      // }
      //
      // function searchError(searchRequest) {
      //   alert('An error occurred.');
      // }
  
      $scope.loadWell = function() {
        $scope.prograssing = true;
        /* plants get data */
        $http.get('/api/OilWellOverView')
          .success(function(data) {
            $scope.prograssing = false;

            // handle escape character for url routing
            data.map(function(i) {
              i.OilWells.map(function(j) {
                j.UnitId = encodeURI(j.UnitId);
              }); 
            });

            // add wells if the number of OilWells can not be divided by 4
            data.map(function(i) {
              var mod = i.OilWells.length % TILE_COL;
              if (mod !== 0) {
                var remainings = TILE_COL - mod;
                for (var j = 0; j < remainings; j++) {
                  i.OilWells.push({Status: '#d1d1d1'});
                }
              }
            });

            // alter data structure such that can be rendered nicely
            // in HTML. now it has 3 loops
            var group = [];
            for (var i = 0; i < data.length; i++) {
              group.push(data[i]);
              if (group.length === PLANT_PER_GROUP) {
                $scope.groups.push(group);
                group = [];
              }
            }

            $scope.groups.push(group);
          })
          .error(function(data) {
            $scope.group = data || 
            [
              {'msg': 'Request Failed from Server'}
            ];
            $scope.prograssing = false;
          });
      };
      $scope.spinWells = $scope.loadWell();

      $scope.pollWells = $interval(function() {
        $http.get('/api/OilWellOverView')
          .success(function(data) {
            $scope.totalWells = data;
          });
      }, HTTP_INTERVAL);
      
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
            $scope.alertActiveAlarm = data ||
            [
              {
                'msg': 'Request Failed From Server'
              }
            ];
            $scope.prograssing = false;
          });
      };
      $scope.spinAlarms = $scope.loadAlarm();
      
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
        $interval.cancel($scope.pollWells);
        $interval.cancel($scope.pollActiveAlarms);
      });
 
  }]);

