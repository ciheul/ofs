'use strict';

angular.module('ofsApp')
  .controller('WellCtrl', ['$scope', '$rootScope', '$http', '$interval',
    function($scope, $rootScope, $http, $interval) {

      const INTERVAL = 10000;
      var map = null;
      const TILE_COL = 4;
      const PLANT_PER_GROUP = 3;

      $scope.groups = [];
      $scope.eventsAlarm = [];

      $scope.GetMap = function(){
        console.log('debug"');
        map = new Microsoft.Maps.Map(document.getElementById('mapDiv'), {credentials: 'AmSRI0ujkP_9tyTGJVQxuuXTEnX6dumwkQyflm7aqzbOCLVZ-lRGRosGueF8Cf2v', center: new Microsoft.Maps.Location(47.5, -122.3), zoom: 9 });

        Microsoft.Maps.loadModule('Microsoft.Maps.Search');
      };
      function searchModuleLoaded()
      {
        var searchManager = new Microsoft.Maps.Search.SearchManager(map);

        /*var searchRequest = {query:"pizza in Seattle, WA", count: 5, callback:searchCallback, errorCallback:searchError};
        searchManager.search(searchRequest);*/
      }
      function searchError(searchRequest){
        alert('An error occurred.');
      }

    /* preloader before the data appears */
      /*$scope.startSpin = function(){
          usSpinnerService.spin('spinner-1');
      };
      $scope.stopSpin = function(){
          usSpinnerService.stop('spinner-1');
      };*/
     
  
      $scope.loadWell = function() {
        $scope.prograssing = true;
        /* plants get data */
        $http.get('/data/well-overview.json')
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
            console.log(data);
            $scope.prograssing = false;
          });
      };
      $scope.spinWells = $scope.loadWell();

      $scope.pollWells = $interval(function() {
        $http.get('/data/well-overview.json')
          .success(function(data) {
            $scope.totalWells = data;
          });
      }, INTERVAL);
      
      
      $scope.loadAlarm = function() {
        $scope.prograssing = true;
      /* interval Active Alarm */
      // $http.get('http://teleconscada-web00.cloudapp.net:1980/api/ActiveAlarms')
        $http.get('/data/well-active-alarm.json')
          .success(function(data) {
            $scope.eventsAlarm = data;
        })
        .error(function() {
          $scope.eventsAlarm = 0;
        });
      };
      $scope.spinAlarms = $scope.loadAlarm();

      $scope.pollActiveAlarms = $interval(function() {
        $http.get('/data/well-active-alarm.json')
        .success(function(data) {
          $scope.eventsAlarm = data;
        });
      }, INTERVAL);

       /* interval Historical Alarm */
      // $http.get('http://teleconscada-web00.cloudapp.net:1980/api/HistoricalAlarms')
      $http.get('http://teleconscada-web00.cloudapp.net:1980/api/HistoricalAlarms')
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

      // when routes changes, cancel all interval operations
      $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.pollWells);
        $interval.cancel($scope.pollActiveAlarms);
      });
 
      $scope.getCount = function() {
        return $scope.eventsAlarm.length;
        /*return 0;*/
      };
      $scope.count = function() {
        $rootScope.$broadcast('ping', {
          ping:$scope.getCount
        });
      };
  }]);

