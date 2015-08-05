'use strict';


angular.module('ofsApp')
  .controller('LoginCtrl', ['$scope', '$sessionStorage', '$routeParams','$http', '$location',
    'AuthenticationService', '$rootScope',
    function($scope, $sessionStorage, $routeParams, $http, $location, AuthenticationService, $rootScope) {

      // reset login status
        AuthenticationService.ClearCredentials();
        
        $scope.login = function () {
          $scope.progressing = true;
          AuthenticationService.Login($scope.username, $scope.password, function(response) {
            if(response) {
              AuthenticationService.SetCredentials($scope.username, $scope.password);
              /*$rootScope.loggedUser = $scope.username;*/
              $location.path('/well');
            } else {
              $scope.error = response.message;
              $scope.progressing = false;
            }
          });
          /*$scope.data = AuthenticationService.Login;
          $sessionStorage.data = $scope.data;*/
        };

       /* $scope.login = function (username, password, callback) {
          username;
          password;

          var param = {
          bfp: $routeParams.browserFingerprint(username, password)
          };*/

         /* var bfp = browserFingerprint(username, password);
          var fp = $routeParams.bfp.split('.')[1];
          var param = { uuid: $routeParams.bfp};*/
          /*console.log(param);
          $http.post('api/OilWellOverView', { params : param })
            .success(function(response){
              console.log(response);
              if (response.success) {
                $sessionStorage = response;
                $location.path('#/well');
              } else {
                response.message = $location.path('#');
              }
              callback(response); 
            });
        };*/
    }]);
 
    