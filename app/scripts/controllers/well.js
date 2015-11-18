'use strict';

angular.module('ofsApp')
  .controller('WellCtrl', ['$scope', '$rootScope', '$http', '$interval',
    '$sessionStorage', 'HTTP_INTERVAL',
    function($scope, $rootScope, $http, $interval, $sessionStorage,
        HTTP_INTERVAL) {
      const TILE_COL = 4;
      const PLANT_PER_GROUP = 3;
      // var well = [];
      // var loadWell = [];

      $scope.widthScreen = 3120;
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
            $scope.alert = false;
            $scope.groups = [];
      
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

            $sessionStorage.plants = $scope.groups;
            // console.log($sessionStorage.plants);
          })
          .error(function(data) {
            $scope.alert = data || 'Request Failed from Server';
            $scope.groups = $sessionStorage.plants;
            // console.log($scope.groups);
            $scope.progressing = false;
          });
      };
      $scope.loadWell();

      $scope.pollWells = $interval(function() {
        $scope.loadWell();
      }, HTTP_INTERVAL);

      // when routes changes, cancel all interval operations
      $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.pollWells);
      });
    }
  ]);
