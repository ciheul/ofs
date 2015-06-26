'use strict';

/* ofs-well */

angular.module('ofsApp')
  .controller('SubstationCtrl', ['$scope', '$rootScope', '$http', '$interval', 'HTTP_INTERVAL',
    function($scope, $rootScope, $http, $interval, HTTP_INTERVAL) {

    const TILE_COL = 4;
    const ACTIVE_ALARM_ROWS = 12;
    const HISTORICAL_ALARM_ROWS = 12;
    const PLANT_PER_GROUP = 4;

    var map = null;
    $scope.eventsAlarm = [];
    
    $scope.GetMap = function()
    {
      console.log('debug');
      map = new Microsoft.Maps.Map(document.getElementById('mapDiv2'), {credentials: 'AmSRI0ujkP_9tyTGJVQxuuXTEnX6dumwkQyflm7aqzbOCLVZ-lRGRosGueF8Cf2v', center: new Microsoft.Maps.Location(47.5, -122.3), zoom: 9 });

      Microsoft.Maps.loadModule('Microsoft.Maps.Search');

    };


   /* function searchModuleLoaded()
    {
      var searchManager = new Microsoft.Maps.Search.SearchManager(map);

      var searchRequest = {query:"pizza in Seattle, WA", count: 5, callback:searchCallback, errorCallback:searchError};
      searchManager.search(searchRequest);
    }*/

    

     /* function searchError(searchRequest)
      {
        alert('An error occurred.');
      }*/

      $scope.isLoaded = false;
      /* plants get data */
      $scope.loadWell = function() {
        $scope.prograssing = true;
        $http.get('/api/substationOverview')/*http://localhost:3000/api/wells*/
          .success(function(data) {
            $scope.isLoaded = true;
            $scope.totalWells = data;
            $scope.groups = [];
            $scope.prograssing = false;
            $scope.alert = false; 

            data.map(function(i) {
              i.Substations.map(function(j) {
                // disable click if not green or yellow
                if (j.Status === 'green' || j.Status === 'yellow') {
                  j.Url = '#/' + j.DetailUrl + '/' + j.Name;
                } else {
                  j.Url = '#/substation';
                }
              }); 
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
            $scope.alert = data ||'Request Failed From Server';
            $scope.prograssing = false;
            console.log(data);
          });
      };
  
      $scope.pollSubstations = $interval(function() {
       // $http.get('/api/substationOverview')/*http://localhost:3000/api/wells*/
        // .success(function(data) {
          $scope.loadWell();
        // });
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

 
  
  
/*end of ofs-well*/

/*SRP-DETAIL*/

