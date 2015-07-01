'use strict';

angular.module('ofsApp')
  .controller('SrpCtrl', ['$scope', '$rootScope', '$http', '$routeParams',
    '$interval', '$localStorage', '$sessionStorage', 'HTTP_INTERVAL',
    function($scope, $rootScope, $http, $routeParams, $interval, $localStorage, HTTP_INTERVAL) {
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
            $localStorage.dataSrp = $scope.dataId;
          })
          .error(function(data) {
            $scope.dataId = $localStorage.dataSrp;
            console.log($scope.dataId);
            $scope.alert = data ||'Request Failed from Server';
            $scope.prograssing = false;
          });
      };
      $scope.loadData();

      /*interval data srp*/
      $scope.pollDataSrp = $interval(function(){
        /*$http.get('http://teleconscada-web00.cloudapp.net:1980/api/srpdetail/', {params: param})*/
        /*$http.get('/api/SrpDetail/', { params: param })
          .success(function(data) {*/
            $scope.loadData();
      }, HTTP_INTERVAL);

      /*trending*/
      $scope.filterTrending = function(startTrend, endTrend) {
        startTrend = startTrend.replace(/\./g, '');
        endTrend = endTrend.replace(/\./g, '');

        var params = {
          unitId: $routeParams.UnitId,
          dtfrom: startTrend + '000000',
          dtto: endTrend + '000000'
        };

        //http://teleconscada-web00.cloudapp.net:1980/api/SRPTrending/?unitId=EPTJ%5COW.T150&dtfrom=20150506160000&dtto=20150507160000
        //$http.get('', { params: params })
        $http.get('http://localhost:28000/data/trend.json')
          .success(function(data) {
            $scope.dataTrend = data;
          });
      };
    }
  ]);
