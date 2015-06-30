'use strict';

angular.module('ofsApp')
  .controller('EspCtrl', ['$scope', '$rootScope', '$http', '$routeParams', '$interval', 'HTTP_INTERVAL',
    function($scope, $rootScope, $http, $routeParams, $interval, HTTP_INTERVAL) {
      $scope.UnitId = $routeParams.UnitId.split('.')[1];

      var param = {unitId: $routeParams.UnitId};
      $scope.eventsAlarm = [];
      const ACTIVE_ALARM_ROWS = 10;
      const HISTORICAL_ALARM_ROWS = 9;


      /*$http.get('http://teleconscada-web00.cloudapp.net:1980/api/espdetail/', {params: param})*/
      /*spin loader esp data*/
      $scope.loadData = function (){
        $scope.prograssing = true;
        $http.get('/api/EspDetail/', { params: param })
      	 .success(function(data) {
            $scope.dataId = data;
            $scope.prograssing = false;
            $scope.alert = false;
          })
          .error(function(data) {
            $scope.alert = data ||'Request Failed from Server';
            $scope.prograssing = false;
          });
      };
      $scope.loadData();

      /*interval esp data*/
      $scope.pollDataEsp = $interval(function(){
      	/*$http.get('/api/EspDetail/', {params: param})
      	  .success(function(data) {*/
          	$scope.loadData();
          /*});*/
      }, 10000);

      /*trending*/
      $scope.filterTrending = function(startTrend, endTrend) {
        startTrend = startTrend.replace(/\./g, '');
        endTrend = endTrend.replace(/\./g, '');

        var params = {
          unitId: $routeParams.UnitId,
          dtfrom: startTrend + '000000',
          dtto: endTrend + '000000'
        };

        $scope.isFilteringESP = true;
        //http://teleconscada-web00.cloudapp.net:1980/api/SRPTrending/?unitId=EPTJ%5COW.T150&dtfrom=20150506160000&dtto=20150507160000
        // $http.get('data/trend.json')
        $http.get('/api/ESPTrending', { params: params })
          .success(function(data) {
            $scope.isFilteringESP = false;
            $scope.dataTrend = data;
          });
      };

      // when routes changes, cancel all interval operations
      $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.pollDataEsp);
      });
    }
  ]);
