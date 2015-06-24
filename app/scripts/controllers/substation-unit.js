'use strict';

angular.module('ofsApp')
 .controller('UnitCtrl', ['$scope', '$rootScope', '$http', '$routeParams', '$interval',
    function($scope, $rootScope, $http, $routeParams, $interval) {
      $scope.Name = $routeParams.Name;

      /*var param = {name: $routeParams.Name};*/
      $scope.eventsAlarm = [];
    
      /* plants get data */
      $scope.loadData = function (){
        $scope.prograssing = true;
        $http.get('/api/SubstationOverview/SubstationUnit')/*http://localhost:3000/api/wells*/
          .success(function(data) {
            $scope.unit = data;
            $scope.prograssing = false;
          })
          .error(function(data){
            $scope.alert = data || 'Request Failed From Server';
            $scope.prograssing = false;
        });
      };
      $scope.spinData = $scope.loadData();
      
      $scope.pollSubstations = $interval(function() {
       $http.get('/api/SubstationOverview/SubstationUnit')/*http://localhost:3000/api/wells*/
        .success(function(data) {
          $scope.unit = data;
        });
      }, 10000);

      /* interval Active Alarm */
      $scope.loadAlarm = function (){
        $scope.prograssing = true;
        $http.get('/api/SubstationOverview/SubstationUnit/ActiveAlarms')
          .success(function(data){
            $scope.eventsAlarm = data;
            $scope.prograssing = false;

            $scope.getCount = function() {
              return $scope.eventsAlarm.length;
            };

            $scope.count = function() {
              $rootScope.$broadcast('ping',{
                ping:$scope.getCount
              });
            };
          })
          .error(function(data) {
            $scope.alertActiveAlarm = data || 'Request Failed From Server';
            $scope.prograssing = false;
          });
      };
      $scope.spinAlarms = $scope.loadAlarm();

      $scope.pollActiveAlarms = $interval(function() {
        $http.get('/api/SubstationOverview/SubstationUnit/ActiveAlarms')
        .success(function(data) {
          $scope.eventsAlarm = data;
        });
      }, 10000);

       /* interval Historical Alarm */
      $http.get('/api/SubstationOverview/SubstationUnit/HistoricalAlarms')
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
        $interval.cancel($scope.pollSubstations);
        $interval.cancel($scope.pollActiveAlarms);
      });
  }]);
