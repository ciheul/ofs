'use strict';

angular.module('ofsApp')
  .controller('WellCtrl', ['$scope', '$rootScope', '$http', '$interval', '$localStorage',
    '$sessionStorage', 'HTTP_INTERVAL',
    function($scope, $rootScope, $http, $interval, $localStorage, $sessionStorage, HTTP_INTERVAL) {

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
      // var well = [];
      // var loadWell = [];


      $scope.groups = [];
      console.log($scope.groups);

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
            console.log($scope.groups);

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
              $scope.groups.push($localStorage);
            }

            $localStorage.message = data;
            console.log($localStorage.message);
          })
          .error(function(data) {
            $scope.alert = data || 'Request Failed from Server';
            $scope.groups = $localStorage.message;
            console.log($scope.groups);
            $scope.progressing = false;
          });
      };
      $scope.loadWell();

      $scope.pollWells = $interval(function() {
        $scope.loadWell();
      }, HTTP_INTERVAL);

      /*$scope.$storage = $localStorage.$default({
        x: $scope.loadWell(),
        y: 22
      });

      $scope.deleteX = function() {
        delete $scope.$storage.x;
      };
        
      $scope.deleteY = function() {
        delete $scope.$storage.y;
      };*/
    }
  ]);
