'use strict';

angular.module('ofsApp')
  .controller('IndexCtrl', ['$scope', '$http',  
    function($scope, $http) {

      /*$scope.anything = 5;

      console.log('IndexCtrl - DEBUG 1');
      $scope.$on('showData', function(wellEvent, obj){
        console.log('IndexCtrl - DEBUG 2');

        console.log(obj);
        $scope.callData = obj.showData();

        $scope.myCallData = function() {
          
        };

        console.log('IndexCtrl - DEBUG 2 ENDS');
      });
      console.log('IndexCtrl - DEBUG 1 ENDS');*/

      $http.get('http://teleconscada-web00.cloudapp.net:1980/api/ActiveAlarms')
        .success(function(data){
          $scope.eventsAlarm = data;
        });

      $scope.getCount = function(){
        return $scope.eventsAlarm.length;
      };
  }]);
