'use strict';

angular.module('ofsApp')
  .controller('TopNavCtrl', ['$scope', 'AuthenticationService',
    function($scope, AuthenticationService) {
      $scope.logout = function() {
        AuthenticationService.Logout();
      };

      $scope.$on('ping', function(e, Object) {
        $scope.add = Object;
        // $scope.isAlarm = false;
        // if ($scope.add.ping() > 0) {
        //   $scope.isAlarm = true;
        // }
        // $scope.isAlarm = true;
      });

      $scope.isAlarm = false;
    }
  ]);
