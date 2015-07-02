'use strict';

/* ofs-well */

angular.module('ofsApp')
  .controller('SubstationCtrl', ['$scope', '$rootScope', '$http', '$interval', '$localStorage',
    '$sessionStorage', 'HTTP_INTERVAL',
    function($scope, $rootScope, $http, $interval, $localStorage, $sessionStorage, HTTP_INTERVAL) {

    const TILE_COL = 4;
    const ACTIVE_ALARM_ROWS = 12;
    const HISTORICAL_ALARM_ROWS = 12;
    const PLANT_PER_GROUP = 4;

    /*var map = null;
    $scope.eventsAlarm = [];
    
    $scope.GetMap = function()
    {
      console.log('debug');
      map = new Microsoft.Maps.Map(document.getElementById('mapDiv2'), {credentials: 'AmSRI0ujkP_9tyTGJVQxuuXTEnX6dumwkQyflm7aqzbOCLVZ-lRGRosGueF8Cf2v', center: new Microsoft.Maps.Location(47.5, -122.3), zoom: 9 });

      Microsoft.Maps.loadModule('Microsoft.Maps.Search');

    };
*/

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

            $scope.coba = data;
            $localStorage.message = $scope.totalWells;
            console.log($localStorage.message);
          })
          .error(function(data) {
            $scope.groups = [];
            $scope.alert = data ||'Request Failed From Server';
            $scope.prograssing = false;
            $scope.panggilCoba = $scope.coba;
            $scope.Substations = $localStorage.message;
            console.log($scope.panggilCoba);
            console.log($scope.groups);
          });
      };
      $scope.loadWell();

      $scope.pollSubstations = $interval(function() {
       // $http.get('/api/substationOverview')/*http://localhost:3000/api/wells*/
        // .success(function(data) {
          $scope.loadWell();
        // });
      }, 10000);

    }
  ]);
