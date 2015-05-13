 'use strict';

var srpControllers = angular.module('srpControllers', []);

 srpControllers.controller('srpCtrl', ['$scope', '$http', '$routeParams', 
  function ($scope, $routeParams, $http){

    console.log($routeParams.UnitId);
    var param = {unitId: $route.Params.UnitId};
      $http.get('http://teleconscada-web00.cloudapp.net:1980/api/srpdetail/', {params: param})
      .success(function(data){
        $scope.dataId = data;
    });
      console.log($routeParams.UnitId);
  }]);
 