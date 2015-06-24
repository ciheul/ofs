'use strict';

angular.module('ofsApp')
  .controller('WellCtrl', ['$scope', '$rootScope', '$http', '$interval',
      'HTTP_INTERVAL',
    function($scope, $rootScope, $http, $interval, HTTP_INTERVAL) {

      // var map = null;
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
  
      const TILE_COL = 4;
      const PLANT_PER_GROUP = 3;
      const ACTIVE_ALARM_ROWS = 12;
      const HISTORICAL_ALARM_ROWS = 12;

      $scope.groups = [];

      $scope.isFirstGroup = false;
      $scope.isPlantLoaded = false;

      $scope.loadWell = function() {
        $scope.progressing = true;
        /* plants get data */
        $http.get('/api/OilWellOverView')
          .success(function(data) {
            $scope.isPlantLoaded = true;
            $scope.progressing = false;
            $scope.groups = [];
            $scope.alert = false;

            // handle escape character for url routing
            data.map(function(i) {
              i.OilWells.map(function(j) {
                // disable click if not green or yellow
                if (j.Status === 'green' || j.Status === 'yellow') {
                  j.UnitId = encodeURI(j.UnitId);
                  j.Url = '#/' + j.DetailUrl + '/' + j.UnitId;
                } else {
                  j.Url = '#';
                }
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

            var group = { plants: [], isFirstGroup: true };
            for (var i = 0; i < data.length; i++) {
              group.plants.push(data[i]);
              if (group.plants.length === PLANT_PER_GROUP) {
                $scope.groups.push(group);
                group = { plants: [], isFirstGroup: false };
              }
            }

            // if the latest new group doesn't have plants, do not render
            if (group.plants.length > 0) {
              $scope.groups.push(group);
            }
          })
          .error(function(data) {
            $scope.alert = data || 'Request Failed from Server';
            $scope.progressing = false;
          });
      };
      $scope.loadWell();

      $scope.pollWells = $interval(function() {
        $scope.loadWell();
      }, HTTP_INTERVAL);
      
      /*spin active alarm*/
      $scope.eventsAlarm = [];
      $scope.loadAlarm = function() {
        $scope.isActiveProgressing = true;
        /* interval Active Alarm */
        // $http.get('http://teleconscada-web00.cloudapp.net:1980/api/ActiveAlarms')
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
            $scope.isHistoricalProgressing = false;
          });
      };

      // when routes changes, cancel all interval operations
      $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.pollWells);
        $interval.cancel($scope.pollActiveAlarms);
      });
 
  }]);

