'use strict';

angular.module('ofsApp')
 .controller('UnitCtrl', ['$scope', '$rootScope', '$http', '$routeParams', '$interval', '$sessionStorage', 'HTTP_INTERVAL',
    function($scope, $rootScope, $http, $routeParams, $interval, $sessionStorage, HTTP_INTERVAL) {
      $scope.Name = $routeParams.Name;

      /*var param = {name: $routeParams.Name};*/
      const TILE_COL = 4;
      const PLANT_PER_GROUP = 3;

      $scope.eventsAlarm = [];
      $scope.groups = [];

      $scope.isFirstGroup = false;
      $scope.isLoaded = false;
      /* plants get data */
      $scope.loadData = function (){
        $scope.prograssing = true;
        $http.get('/api/SubstationOverview/SubstationUnit')/*http://localhost:3000/api/wells*/
          .success(function(data) {
            $scope.prograssing = false;
            $scope.groups = [];
            $scope.alert = false;
            $scope.isLoaded = true;

            data.map(function(i) {
              i.SubstationUnits.map(function(j) {
                // disable click if not green or yellow
                if (j.Status === 'green' || j.Status === 'yellow') {
                  j.Url = '#/' + j.DetailUrl + '/' + j.Name;
                } else {
                  j.Url = '#/st-detail/' + j.Name;
                }
              }); 
            });

            data.map(function(i) {
              var mod = i.SubstationUnits.length % TILE_COL;
              if (mod !== 0) {
                var remainings = TILE_COL - mod;
                for (var j = 0; j < remainings; j++) {
                  i.SubstationUnits.push({Status: '#d1d1d1'});
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

            $sessionStorage.SubstationUnit = $scope.groups;
          })
          .error(function(data){
            $scope.groups = $sessionStorage.SubstationUnit;
            $scope.alert = data || 'Request Failed From Server';
            $scope.prograssing = false;
        });
      };
     $scope.loadData();
      
      $scope.pollSubstations = $interval(function() {
       // $http.get('/api/SubstationOverview/SubstationUnit')/*http://localhost:3000/api/wells*/
        // .success(function(data) {
          $scope.loadData();
        // });
      }, HTTP_INTERVAL);

      $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.pollSubstations);
      });

    }
  ]);
