'use strict';

angular.module('ofsApp')
  .controller('EquCtrl', ['$scope', '$rootScope', '$http', '$routeParams', '$interval', 
    '$localStorage', '$sessionStorage', 'HTTP_INTERVAL',
    function($scope, $rootScope, $http, $routeParams, $interval, $sessionStorage, HTTP_INTERVAL) {
      // get SRP equipment name (ex: T150)
      $scope.Name = $routeParams.Name;

      /*var param = {name: $routeParams.Name};*/
      $scope.eventsAlarm = [];

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
            $sessionStorage.substationEqu = $scope.dataId;
          })
          .error(function(data) {
            $scope.dataId = $sessionStorage.substationEqu;
            $scope.alert = data ||'Request Failed From Server';
            $scope.prograssing = false;
          });
      };
      $scope.loadData();

      $scope.pollDataEqu = $interval(function() {
        $scope.loadData();
      }, HTTP_INTERVAL);

      $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.pollDataEqu);
      });
    }
  ]);
