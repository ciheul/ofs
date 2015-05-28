'use strict';

angular.module('ofsApp')
  .controller('IndexCtrl', ['$scope',  
    function($scope) {
      $scope.$on('ping', function(e, Object) {
        $scope.add = Object;
      });
    }
  ]);
