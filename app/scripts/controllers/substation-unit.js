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
          .error(function(){
            $scope.unit = 0;
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
            $scope.prograssing = false;
            $scope.eventsAlarm = data;
          })
          .error(function() {
            $scope.prograssing = false;
            $scope.eventsAlarm = 0;
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

     /* $scope.filterAlarm = function(start, end) {
        console.log('hello');
        console.log(start);
        console.log(end);
        
        console.log($scope.start);
        console.log($scope.end);

        console.log(this.start);
        console.log(this.end);
        start = start.replace(/\./g, '');
        end = end.replace(/\./g, '');
        var params = {dtfrom: start + '000000', dtto: end + '000000'};
        $http.get('', {params: params})
        .success(function(data){
          console.log(data);
          $scope.eventsHistoric = data;
        });
      };*/

      // when routes changes, cancel all interval operations
      $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.pollSubstations);
        $interval.cancel($scope.pollActiveAlarms);
      });

      $scope.getCount = function() {
        return $scope.eventsAlarm.length;
        /*return 0;*/
      };

      $scope.count = function() {
        $rootScope.$broadcast('ping',{
          ping:$scope.getCount
        });
      };
  }]);
