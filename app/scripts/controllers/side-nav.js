'use strict';

angular.module('ofsApp')
  .controller('SideNavCtrl', ['$scope',
    function($scope) {
      $scope.isLogin = false;

      $scope.$on('isLogin', function(e, Object) {
        $scope.isLogin = Object.isLogin;
      });
    }
  ]);
