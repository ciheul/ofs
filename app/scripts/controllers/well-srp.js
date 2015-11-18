'use strict';

angular.module('ofsApp')
  .controller('SrpCtrl', ['$scope', '$rootScope', '$http', '$routeParams',
    '$interval', '$sessionStorage', 'HTTP_INTERVAL',
    function($scope, $rootScope, $http, $routeParams, $interval,
        $sessionStorage, HTTP_INTERVAL) {
      $scope.widthScreen = 4180;

      // get SRP equipment name (ex: T150)
      $scope.UnitId = $routeParams.UnitId.split('.')[1];

      var param = { UnitId: $routeParams.UnitId };

      $scope.eventsAlarm = [];

      /*spin loader data srp*/
      $scope.loadData = function (){
        $scope.prograssing = true;
        $http.get('api/SrpDetail', { params: param })
      	 .success(function(data) {
            $scope.alert = false;
            $scope.prograssing = false;
            $scope.dataId = data;
            $sessionStorage.dataSrp = $scope.dataId;
          })
          .error(function(data) {
            $scope.dataId = $sessionStorage.dataSrp;
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
