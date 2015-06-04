'use strict';

angular.module('ofsApp')
  .controller('EquCtrl', ['$scope', '$rootScope', '$http', '$routeParams', '$interval', 
    function($scope, $rootScope, $http, $routeParams, $interval) {
      // get SRP equipment name (ex: T150)
      $scope.Name = $routeParams.Name;

      var param = {name: $routeParams.Name};
      $scope.eventsAlarm = [];

     /* $http.get('/data/substation-equ.json', {params: param})*/
      $http.get('/data/substation-equ.json')
        .success(function(data) {
          $scope.dataId = data;
            
        });
      $scope.pollDataEqu = $interval(function(){
        /*$http.get('', {params: param})*/
        $http.get('/data/substation-equ.json')
        .success(function(data) {
          $scope.dataId = data;
        })
        .error(function() {
          $scope.dataId = '0';
        });
      }, 10000);
      
      /* interval Active Alarm */
      $http.get('/data/substation-equ-active-alarm.json')
        .success(function(data){
          $scope.eventsAlarm = data;
        });

      $scope.pollActiveAlarms = $interval(function() {
        $http.get('/data/substation-equ-active-alarm.json')
        .success(function(data) {
          $scope.eventsAlarm = data;
        });
      }, 10000);

       /* interval Historical Alarm */
      $http.get('')
        .success(function(data) {
          $scope.eventsHistoric = data;
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
        $interval.cancel($scope.pollDataEqu);
        $interval.cancel($scope.pollActiveAlarms);
      }); 

      $scope.getCount = function(){
        return $scope.eventsAlarm.length;
      };

      $scope.count = function(){
        $rootScope.$broadcast('ping',{
          ping:$scope.getCount
        });
      };
}]);