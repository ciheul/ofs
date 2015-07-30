'use strict';

/* ofs-well */

angular.module('ofsApp')
  .controller('SubstationCtrl', ['$scope', '$rootScope', '$http', '$interval', 
    '$sessionStorage', 'HTTP_INTERVAL',
    function($scope, $rootScope, $http, $interval, $sessionStorage, HTTP_INTERVAL) {
      const PLANT_PER_GROUP = 4;

      $scope.groups = [];
      $scope.isLoaded = false;
      /* plants get data */
      $scope.loadWell = function() {
        $scope.prograssing = true;
        $http.get('/api/substationOverview')/*http://localhost:3000/api/wells*/
          .success(function(data) {
            $scope.isLoaded = true;
            $scope.totalWells = data;
            $scope.alert = false;
            $scope.groups = [];
            $scope.prograssing = false;

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

            $sessionStorage.substation = $scope.groups;
          })
          .error(function(data) {
            $scope.alert = data ||'Request Failed From Server';
            $scope.groups = $sessionStorage.substation;
            console.log($scope.groups);
          });
      };
      $scope.loadWell();

      $scope.pollSubstations = $interval(function() {
        $scope.loadWell();
      }, HTTP_INTERVAL);

       // when routes changes, cancel all interval operations
      $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.pollSubstations);
      });
    }
  ]);
