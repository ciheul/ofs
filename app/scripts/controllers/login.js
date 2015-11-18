'use strict';


angular.module('ofsApp')
  .controller('LoginCtrl', ['$scope', '$sessionStorage', '$routeParams',
    '$http', '$location', 'AuthenticationService', '$rootScope',
    function($scope, $sessionStorage, $routeParams, $http, $location,
        AuthenticationService, $rootScope) {

      // reset login status
      AuthenticationService.ClearCredentials();
      
      $scope.isLogin = function(status) {
        $rootScope.$broadcast('isLogin', {
          isLogin: status
        });
      };

      // first time, enable sidenav
      $scope.isLogin(true);

      $scope.login = function () {
        $scope.progressing = true;
        AuthenticationService.Login($scope.username, $scope.password,
          function(response) {
            if (response.status === 0) {
              AuthenticationService.SetCredentials($scope.username,
                                                   $scope.password);

              // disable sidenav for all pages but login page
              $scope.isLogin(false);

              /*$rootScope.loggedUser = $scope.username;*/
              $location.path('/well');

            } else {
              $scope.error = 'Username or password is incorrect';
              $scope.progressing = false;
            }
        });
      };
    }]);
