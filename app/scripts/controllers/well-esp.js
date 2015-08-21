'use strict';

angular.module('ofsApp')
  .controller('EspCtrl', ['$scope', '$rootScope', '$http', '$routeParams',
    '$interval', '$sessionStorage', 'HTTP_INTERVAL',
    function($scope, $rootScope, $http, $routeParams, $interval,
        $sessionStorage, HTTP_INTERVAL) {
      // get ESP equipment name (ex: T150)
      $scope.UnitId = $routeParams.UnitId.split('.')[1];

      var param = { unitId: $routeParams.UnitId };

      $scope.eventsAlarm = [];

      /*spin loader esp data*/
      $scope.loadData = function (){
        $scope.prograssing = true;
        $http.get('/api/EspDetail', { params: param })
      	 .success(function(data) {
            $scope.alert = false;
            $scope.prograssing = false;
            $scope.dataId = data;
            $sessionStorage.dataEsp = $scope.dataId;
          })
          .error(function(data) {
            $scope.dataId = $sessionStorage.dataEsp;
            $scope.alert = data ||'Request Failed from Server';
            $scope.prograssing = false;
          });
      };
      $scope.loadData();

      /* interval esp data */
      $scope.pollDataEsp = $interval(function(){
        $scope.loadData();
      }, HTTP_INTERVAL);

      // when routes changes, cancel all interval operations
      $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.pollDataEsp);
      });
    }
  ]);
