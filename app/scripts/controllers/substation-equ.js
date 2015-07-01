'use strict';

angular.module('ofsApp')
  .controller('EquCtrl', ['$scope', '$rootScope', '$http', '$routeParams', '$interval', 'HTTP_INTERVAL',
    function($scope, $rootScope, $http, $routeParams, $interval, HTTP_INTERVAL) {
      // get SRP equipment name (ex: T150)
      $scope.Name = $routeParams.Name;

      /*var param = {name: $routeParams.Name};*/
      $scope.eventsAlarm = [];
      const ACTIVE_ALARM_ROWS = 12;
      const HISTORICAL_ALARM_ROWS = 12;

      $scope.isLoaded = false;
     /* $http.get('/data/substation-equ.json', {params: param})*/
      $scope.loadData = function () {
        $scope.prograssing = true;
        $http.get('/api/SubstationOverview/SubstationEqu')
         .success(function(data) {
            $scope.isLoaded = true;
            $scope.alert = false;
            $scope.prograssing = false;
            $scope.dataId = data;
          })
          .error(function(data) {
            $scope.alert = data ||'Request Failed From Server';
            $scope.prograssing = false;
          });
      };
      $scope.loadData();

      $scope.pollDataEqu = $interval(function() {
        $scope.loadData();
      }, 10000);
      
    }
  ]);
