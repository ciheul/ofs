'use strict';

angular.module('ofsApp')
  .controller('SrpCtrl', ['$scope', '$rootScope', '$http', '$routeParams', '$interval', 
    function($scope, $rootScope, $http, $routeParams, $interval) {
      // get SRP equipment name (ex: T150)
      $scope.UnitId = $routeParams.UnitId.split('.')[1];

      var param = {unitId: $routeParams.UnitId};

      $http.get('http://teleconscada-web00.cloudapp.net:1980/api/srpdetail/', {params: param})
      	.success(function(data) {
        	$scope.dataId = data;
            
        });
      $scope.pollDataSrp = $interval(function(){
        $http.get('http://teleconscada-web00.cloudapp.net:1980/api/srpdetail/', {params: param})
        .success(function(data) {
          $scope.dataId = data;
        })
        .error(function() {
          $scope.dataId = '0';
        });
      }, 10000);
      
      $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.pollDataSrp);
      }); 
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
