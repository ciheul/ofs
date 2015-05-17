'use strict';

/* ofs-well */

angular.module('ofsApp')
  .controller('WellCtrl', ['$scope', '$http', '$interval', 
    function($scope, $http, $interval) {

      const TILE_COL = 4;
      const PLANT_PER_GROUP = 3;

      /* plants get data */
      $http.get('http://teleconscada-web00.cloudapp.net:1980/api/OilWellOverView')/*http://localhost:3000/api/wells*/
        .success(function(data) {
          data.map(function(i) {
            var mod = i.OilWells.length % TILE_COL;
            if (mod !== 0) {
              var remainings = TILE_COL - mod;
              for (var j = 0; j < remainings; j++) {
                i.OilWells.push({Status: '#d1d1d1'});
              }
            }
          });

          $scope.groups = [];
          var group = [];

          for (var i = 0; i < data.length; i++) {
            group.push(data[i]);
            if (group.length === PLANT_PER_GROUP) {
              $scope.groups.push(group);
              group = [];
            }
          }
          $scope.groups.push(group);
        })
        .error(function(data) {
          console.log(data);
        });

      $interval(function() {
       $http.get('http://teleconscada-web00.cloudapp.net:1980/api/OilWellOverView')/*http://localhost:3000/api/wells*/
        .success(function(data) {
          $scope.totalWells = data;
        });
      }, 10000);

      /* interval Active Alarm */
      $http.get('http://teleconscada-web00.cloudapp.net:1980/api/ActiveAlarms')
        .success(function(data){
          $scope.eventsAlarm = data;
        });

      $interval(function() {
        $http.get('http://teleconscada-web00.cloudapp.net:1980/api/ActiveAlarms')
        .success(function(data) {
          $scope.eventsAlarm = data;
        });
      }, 10000);

       /* interval Historical Alarm */
      $http.get('http://teleconscada-web00.cloudapp.net:1980/api/HistoricalAlarms')
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
        $http.get('http://teleconscada-web00.cloudapp.net:1980/api/HistoricalAlarms', {params: params})
        .success(function(data){
          console.log(data);
          $scope.eventsHistoric = data;
        });
      };

      this.enLongPolling = function() {
        $interval.cancel(this.interval);
      };

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


   

  /*$interval(function(){
    var params = {dtfrom:'20150501000000', dtto:'20150512000000'};
    $http.get('http://teleconscada-web00.cloudapp.net:1980/api/HistoricalAlarms', {params: params})
    .success(function(data){
      console.log(data);
      $scope.eventsHistoric = data;
    });
  }, 1000);*/

  }]);

 
  
  
/*end of ofs-well*/

/*SRP-DETAIL*/

