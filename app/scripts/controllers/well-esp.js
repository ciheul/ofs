'use strict';

angular.module('ofsApp')
  .controller('EspCtrl', ['$scope', '$http', '$routeParams', 
    function($scope, $http, $routeParams) {
      console.log($routeParams.UnitId);
      var param = {unitId: $routeParams.UnitId};

      $http.get('http://teleconscada-web00.cloudapp.net:1980/api/espdetail/', {params: param})
      	.success(function(data) {
        	$scope.dataId = data;
        });
    }]);
