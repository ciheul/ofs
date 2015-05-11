  'use strict';

var ofsControllers = angular.module('ofsControllers', []);

/*ofs-well*/

ofsControllers.controller('ofsListCtrl', ['$scope', '$http', '$interval', 
  function($scope, $http, $interval) {

  $scope.result = { total : 0, green : 0, black : 0, yellow : 0, red : 0, gray : 0 };
  console.log('debugs');

  $scope.count = function(totalWells) {
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
   
  /*interval alarm*/
  $http.get('http://teleconscada-web00.cloudapp.net:1980/api/OilWellOverView')
    .success(function(data){
        $scope.totalEvents = data;
      });
  $interval(function(){
    $http.get('http://teleconscada-web00.cloudapp.net:1980/api/OilWellOverView')
    .success(function(data){
        $scope.totalEvents = data;
      });
  }, 10000);
  this.enLongPolling = function(){
    $interval.cancel(this.interval);
  };
  }]);
  
/*end of ofs-well*/

/*SRP-DETAIL*/
 ofsControllers.controller('srpCtrl', ['$scope', '$http', '$routeParams', 
  function ($scope, $routeParams, $http){
    console.log($routeParams.UnitId);
    $http.get('http://teleconscada-web00.cloudapp.net:1980/api/srpdetail/?UnitId=' + $routeParams.UnitId)
      .success(function(data){
        $scope.dataId = data;
    });
  }]);
 