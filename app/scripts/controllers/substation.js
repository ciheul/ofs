'use strict';

/* ofs-well */

angular.module('ofsApp')
  .controller('SubstationCtrl', ['$scope', '$rootScope', '$http', '$interval',
    function($scope, $rootScope, $http, $interval) {

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
            data = null;
            $scope.alert = 'Request Failed From Server';
            $scope.prograssing = false;
          });
      };
      $scope.loadWell();

      $scope.pollSubstations = $interval(function() {
        $scope.loadWell();
      }, 10000);

    }
  ]);
