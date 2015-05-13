  'use strict';

var ofsControllers = angular.module('ofsControllers', []);

/*ofs-well*/

ofsControllers.controller('ofsListCtrl', ['$scope', '$http', '$filter','$interval', 
  function($scope, $http, $filter, $interval) {

  /*$scope.result = { total : 0};*/
 

  /*$scope.count = function(totalWells) {
    console.log('debug');
    console.log(totalWells);
    for (var i = 0; i < totalWells.length; i++) {
      console.log(i);
      for(var j = 0; j < totalWells[i].wells.length; j++) {
        if (totalWells[i].wells[j].status === 'black') {
          $scope.result.black += 1;
        }
        if (totalWells[i].wells[j].status === 'yellow') {
          $scope.result.yellow += 1;
        }
        if (totalWells[i].wells[j].status === 'gray') {
          $scope.result.gray += 1;
        }
        if (totalWells[i].wells[j].status === 'green') {
          $scope.result.green += 1;
        }
        if (totalWells[i].wells[j].status === 'red') {
          $scope.result.red += 1;
        }
        $scope.result.total = ($scope.result.black + 
          $scope.result.yellow +
          $scope.result.green +
          $scope.result.gray 
        );
      }
    }
    console.log($scope.result);
    console.log('debug 2');
  };
  console.log($scope.totalWells);
  */
 /* $scope.showHidenData = function(n){
    for (var i = 0; i < n.length; i++) {
      Things[i]
    };
  }*/


/*plants get data*/
$http.get('http://teleconscada-web00.cloudapp.net:1980/api/OilWellOverView')/*http://localhost:3000/api/wells*/
  .success(function(data) {
    $scope.totalWells = data;
  }).error(function(data){
    console.log(data);
  });
  $interval(function(){
   $http.get('http://teleconscada-web00.cloudapp.net:1980/api/OilWellOverView')/*http://localhost:3000/api/wells*/
    .success(function(data) {
      $scope.totalWells = data;

    });
  }, 10000);

  /*$scope.count = function(totalWells){
    for (var i = 0; i < totalWells.length; i++) {
      for(var j = 0; j < totalWells[i].OilWells.length; j++) {
        if (totalWells[i].OilWells[j].AlarmCount === 1) {
          $scope.result.total += 1;
        }
      }
    }
  };*/

 /* $scope.total = function() {
    var count = 0;
    angular.forEach($scope.totalWells, function(){
      angular.forEach($scope.totalWells.OilWells.AlarmCount, function(totalWells){
        count += totalWells.isSelected ? 1 : 0;
    });
    });
    return count; 
};*/


   
  /*interval Historical Alarm*/
  $http.get('http://teleconscada-web00.cloudapp.net:1980/api/ActiveAlarms')
    .success(function(data){
      $scope.eventsAlarm = data;
    });
  $interval(function(){
    $http.get('http://teleconscada-web00.cloudapp.net:1980/api/ActiveAlarms')
    .success(function(data){
      $scope.eventsAlarm = data;
    });
  }, 10000);

   /*interval Historical Alarm*/
  $http.get('http://teleconscada-web00.cloudapp.net:1980/api/HistoricalAlarms')
    .success(function(data){
      $scope.eventsHistoric = data;
    });

  $scope.filterAlarm = function(){
    console.log('hello');
    console.log($scope.start);
    console.log($scope.end);
    console.log(this.start);
    console.log(this.end);
    var params = {dtfrom: start, dtto: end};
    $http.get('http://teleconscada-web00.cloudapp.net:1980/api/HistoricalAlarms', {params: params})
    .success(function(data){
      console.log(data);
      $scope.eventsHistoric = data;
    });
  };

  /*$interval(function(){
    var params = {dtfrom:'20150501000000', dtto:'20150512000000'};
    $http.get('http://teleconscada-web00.cloudapp.net:1980/api/HistoricalAlarms', {params: params})
    .success(function(data){
      console.log(data);
      $scope.eventsHistoric = data;
    });
  }, 1000);*/

  this.enLongPolling = function(){
    $interval.cancel(this.interval);
  };
  }]);

 
  
  
/*end of ofs-well*/

/*SRP-DETAIL*/
 ofsControllers.controller('srpCtrl', ['$scope', '$http', '$routeParams', 
  function ($scope, $routeParams, $http){
    console.log($routeParams.UnitId);
      $http.get('http://teleconscada-web00.cloudapp.net:1980/api/srpdetail/' + $routeParams.UnitId)
      .success(function(data){
        $scope.dataId = data;
    });
      
  }]);
 