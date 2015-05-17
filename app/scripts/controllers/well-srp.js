'use strict';

angular.module('ofsApp')
  .controller('SrpCtrl', ['$scope', '$http', '$routeParams', 
    function($scope, $http, $routeParams) {
      // get SRP equipment name (ex: T150)
      $scope.UnitId = $routeParams.UnitId.split('.')[1];

      var param = {unitId: $routeParams.UnitId};

      $http.get('http://teleconscada-web00.cloudapp.net:1980/api/srpdetail/', {params: param})
      	.success(function(data) {
        	$scope.dataId = data;
        });
    }]);
