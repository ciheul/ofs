'use strict';

angular.module('ofsApp')
  .controller('SrpCtrl', ['$scope', '$rootScope', '$http', '$routeParams', '$interval', 
    function($scope, $rootScope, $http, $routeParams, $interval) {
      // get SRP equipment name (ex: T150)
      $scope.UnitId = $routeParams.UnitId.split('.')[1];

      /*var param = {unitId: $routeParams.UnitId};*/
      $scope.eventsAlarm = [];
      
      $scope.loadData = function (){
        $scope.prograssing = true;
        /*$http.get('http://teleconscada-web00.cloudapp.net:1980/api/srpdetail/', {params: param})*/
        $http.get('/data/srp.json')
      	 .success(function(data) {
            $scope.prograssing = false;
        	 $scope.dataId = data;
          })
          .error(function() {
            $scope.prograssing = false;
            $scope.dataId = 0;
          });
      };
      $scope.spinData = $scope.loadData();

      $scope.pollDataSrp = $interval(function(){
        /*$http.get('http://teleconscada-web00.cloudapp.net:1980/api/srpdetail/', {params: param})*/
        $http.get('/data/srp.json')
          .success(function(data) {
            $scope.dataId = data;
          });
      }, 10000);
      
      $scope.filterTrending = function(startTrend, endTrend) {
        startTrend = startTrend.replace(/\./g, '');
        endTrend = endTrend.replace(/\./g, '');

        var params = {
          unitId: $routeParams.UnitId,
          dtfrom: startTrend + '000000',
          dtto: endTrend + '000000'
        };

        //http://teleconscada-web00.cloudapp.net:1980/api/SRPTrending/?unitId=EPTJ%5COW.T150&dtfrom=20150506160000&dtto=20150507160000
        $http.get('http://teleconscada-web00.cloudapp.net:1980/api/SRPTrending/',
          { params: params }).success(function(data) {
            $scope.dataTrend = data;
          });
      };
      $scope.loadAlarm = function (){
        $scope.prograssing = true;
        $http.get('/data/srp-active-alarm.json')
          .success(function(data){
            $scope.eventsAlarm = data;
          })
          .error(function() {
            $scope.eventsAlarm = 0;
          });
      };
      $scope.spinAlarms = $scope.loadAlarm();

      $scope.pollActiveAlarms = $interval(function() {
        // $http.get('http://teleconscada-web00.cloudapp.net:1980/api/ActiveAlarms')
        $http.get('/data/srp-active-alarm.json')
        .success(function(data) {
          $scope.eventsAlarm = data;
        });
      }, 10000);

       $http.get('')
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
        $http.get('http://teleconscada-web00.cloudapp.net:1980/api/HistoricalAlarms', {params: params})
        .success(function(data){
          $scope.eventsHistoric = data;
        });
      };
      $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.pollDataSrp);
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


   /* $scope.date = new Date();
*/
   /* $scope.timeStamp = function(dataId){
      for (var i = 0; i < dataId.length; i++) {
        if (dataId[i].FR601_TimeStamp === 'null') {
          $scope.timeStamp == 0;
        }
      }
      console.log($scope.timeStamp);
    };*/

  }]);
