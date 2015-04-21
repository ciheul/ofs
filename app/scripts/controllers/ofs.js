  "use strict"

var ofsControllers = angular.module('ofsControllers', []);
/*ofs-well*/

ofsControllers.controller('ofsListCtrl', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
  $scope.result= { total : 0, green : 0, black : 0, yellow : 0, red : 0, gray : 0 };
  console.log("debugs");

  $scope.count = function(plants) {
    console.log("debug");
    console.log(plants);
    for (var i = 0; i < plants.length; i++) {
      for(var j = 0; j < plants[i].wells.length; j++) {
        if (plants[i].wells[j].status === 'black') {
          $scope.result.black += 1;
        }
        if (plants[i].wells[j].status === 'yellow') {
          $scope.result.yellow += 1;
        }
        if (plants[i].wells[j].status === 'gray') {
          $scope.result.gray += 1;
        }
         if (plants[i].wells[j].status === 'green') {
          $scope.result.green += 1;
        }
        if (plants[i].wells[j].status === 'red') {
          $scope.result.red += 1;
        }
        $scope.result.total = ($scope.result.black + 
          $scope.result.yellow +
          $scope.result.green +
          $scope.result.gray 
        )
      }
    };
    console.log($scope.result);
    console.log("debug 2");
  }
  console.log($scope.totalWells);
  
 /* $scope.showHidenData = function(n){
    for (var i = 0; i < n.length; i++) {
      Things[i]
    };
  }*/

/*plants get data*/
  $http.get("http://localhost:3000/api/wells").success(function(data) {
    $scope.totalWells = data;
    console.log(data);
    $scope.count(data);
  });

/*well-events get data*/
  /*$http.get("http://localhost:3000/api/events").success(function(data){
    $scope.events = data;
    console.log(data);
  });*/
 
  /*interval*/
  $interval(function(){
    $http.get("http://localhost:3000/api/events").
      success(function(data, status, headers, config){
        $scope.events = data;
      });
  }, 2000);

  this.enLongPolling = function(){
    $interval.cancel(this.interval);
  };

}]);


/*end of ofs-well*/

/*electrical*/
 ofsControllers.controller('electricalCtrl', function ($scope){
   $scope.totalElectrical = [
     {   
       'name': 'ST. P. PLANT 1',
       'incoming':'I.87R',
       'trafo':'T.87R'
     }
   ];
 });

