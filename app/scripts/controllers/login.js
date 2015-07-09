'use strict';


angular.module('ofsApp')
  .controller('LoginCtrl', ['browserFingerprint', '$scope', '$sessionStorage', '$routeParams', '$http',
    function(browserFingerprint, $scope, $sessionStorage, $routeParams, $http) {

        $scope.username = $routeParams.username;
        $scope.password = $routeParams.password;
        var browserfingerprint = getFingerPrint($routeParams.username, $routeParams.password);

        $http.post('api/well', { params : browserfingerprint })
          .success(function(response){
            console.log(response);
              $sessionStorage = response;
          })
          .error(function(){
            console.log = 'error';
          });
    }]);
 
    