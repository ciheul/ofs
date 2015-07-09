'use strict';


angular.module('ofsApp')
  .controller('LoginCtrl', ['browserFingerprint', '$scope', '$sessionStorage', '$routeParams', '$http', '$location',
    function(browserFingerprint, $scope, $sessionStorage, $routeParams, $http, $location) {

        $scope.login = function (username, password) {
          username = [];
          password = [];
          var getFingerPrint = $routeParams.browserfingerprint(username, password);
          $http.post('/api/well', { params : getFingerPrint })
            .success(function(response){
              console.log(response);
              if (response.success) {
                $sessionStorage = response;
                $location.path('#/well');
              } else {
                $location.path('#/login');
              } 
            });
        };
    }]);
 
    