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
            $scope.dataId = data ||
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
          .error(function() {
            $scope.eventsAlarm = 0;
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
}]);