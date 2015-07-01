'use strict';

angular.module('ofsApp')
  .controller('SrpCtrl', ['$scope', '$rootScope', '$http', '$routeParams',
    '$interval', 'HTTP_INTERVAL',
    function($scope, $rootScope, $http, $routeParams, $interval, HTTP_INTERVAL) {
      // get SRP equipment name (ex: T150)
      $scope.UnitId = $routeParams.UnitId.split('.')[1];

      var param = { UnitId: $routeParams.UnitId };

      $scope.eventsAlarm = [];
      const ACTIVE_ALARM_ROWS = 10;
      const HISTORICAL_ALARM_ROWS = 9;

      /*spin loader data srp*/
      $scope.loadData = function (){
        $scope.prograssing = true;
        /*$http.get('http://teleconscada-web00.cloudapp.net:1980/api/srpdetail/', {params: param})*/
        $http.get('api/SrpDetail/', { params: param })
      	 .success(function(data) {
        	  $scope.dataId = data;
            $scope.alert = false;
            $scope.prograssing = false;
          })
          .error(function(data) {
            $scope.alert = data ||'Request Failed from Server';
            $scope.prograssing = false;
          });
      };
      $scope.loadData();

      /* interval data srp */
      $scope.pollDataSrp = $interval(function(){
        $scope.loadData();
      }, HTTP_INTERVAL);

      // when routes changes, cancel all interval operations
      $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.pollDataSrp);
      });

    }
  ]);
