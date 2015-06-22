'use strict';

angular.module('ofsApp')
  .controller('EquCtrl', ['$scope', '$rootScope', '$http', '$routeParams', '$interval', 
    function($scope, $rootScope, $http, $routeParams, $interval) {
      // get SRP equipment name (ex: T150)
      $scope.Name = $routeParams.Name;

      /*var param = {name: $routeParams.Name};*/
      $scope.eventsAlarm = [];

     /* $http.get('/data/substation-equ.json', {params: param})*/
     $scope.loadData = function () {
        $scope.prograssing = true;
        $http.get('/api/SubstationOverview/SubstationEqu')
         .success(function(data) {
            $scope.dataId = data;
            $scope.prograssing = false;
          })
          .error(function(data) {
            $scope.alert = data ||
            [
              {
                'msg': 'Request Failed From Server'
              }
            ];
            $scope.prograssing = false;
          });
      };
      $scope.spinData = $scope.loadData();

      $scope.pollDataEqu = $interval(function() {
        /*$http.get('', {params: param})*/
        $http.get('/api/SubstationOverview/SubstationEqu')
        .success(function(data) {
          $scope.dataId = data;
        });
      }, 10000);
      
      /* interval Active Alarm */
      $scope.loadAlarm = function () {
        $scope.prograssing = true;
        $http.get('/api/SubstationOverview/SubstationEqu/ActiveAlarms')
          .success(function(data) {
            $scope.eventsAlarm = data;
            $scope.prograssing = false;
            $scope.getCount = function(){
              return $scope.eventsAlarm.length;
            };

            $scope.count = function() {
              $rootScope.$broadcast('ping',{
                ping:$scope.getCount
              });
            };
          })
          .error(function(data) {
            $scope.alertActiveAlarm = data ||
            [
              {
                'msg': 'Request Failed From Server'
              }
            ];
            $scope.prograssing = false;
          });
      };
      $scope.spinAlarms = $scope.loadAlarm();
      $scope.pollActiveAlarms = $interval(function() {
        $http.get('/api/SubstationOverview/SubstationEqu/ActiveAlarms')
        .success(function(data) {
          $scope.eventsAlarm = data;
        });
      }, 10000);

       /* interval Historical Alarm */
      $http.get('api/SubstationOverview/SubstationEqu/HistoricalAlarms')
        .success(function(data) {
          $scope.eventsHistoric = data;
        })
        .error(function(){
          $scope.eventsHistoric = 0;
        });

     /* interval Historical Alarm */
      // $http.get('http://teleconscada-web00.cloudapp.net:1980/api/HistoricalAlarms')
      /*$http.get('/api/HistoricalAlarms')
        .success(function(data) {
          $scope.eventsHistoric = data;
        })
        .error(function() {
          $scope.eventsHistoric = 0;
        });

      $scope.filterAlarm = function(start, end) {
        start = start.replace(/\./g, '');
        end = end.replace(/\./g, '');
        var params = {dtfrom: start + '000000', dtto: end + '000000'};
        $http.get('/api/HistoricalAlarms', {params: params})
        .success(function(data){
          $scope.eventsHistoric = data;
        });
      };*/
      
      // when routes changes, cancel all interval operations
      $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.pollDataEqu);
        $interval.cancel($scope.pollActiveAlarms);
      }); 
}]);