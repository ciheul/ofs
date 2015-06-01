'use strict';

angular.module('ofsApp')
  .controller('SubstationUnitCtrl', ['$scope', '$rootScope', '$http', '$interval', 
    function($scope, $rootScope, $http, $interval) {

      /* plants get data */
      $http.get('')/*http://localhost:3000/api/wells*/
        .success(function(data) {
          $scope.unit = data;
        })
        .error(function(data) {
          console.log(data);
        });

      $scope.pollSubstations = $interval(function() {
       $http.get('')/*http://localhost:3000/api/wells*/
        .success(function(data) {
          $scope.totalWells = data;
        });
      }, 10000);

      /* interval Active Alarm */
      $http.get('')
        .success(function(data){
          $scope.eventsAlarm = data;
        });

      $scope.pollActiveAlarms = $interval(function() {
        $http.get('')
        .success(function(data) {
          $scope.eventsAlarm = data;
        });
      }, 10000);

       /* interval Historical Alarm */
      $http.get('')
        .success(function(data) {
          $scope.eventsHistoric = data;
        });

      $scope.filterAlarm = function(start, end) {
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
      };

      // when routes changes, cancel all interval operations
      $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.pollSubstations);
        $interval.cancel($scope.pollActiveAlarms);
      });
  }]);
