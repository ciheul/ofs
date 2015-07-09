'use strict';


angular.module('ofsApp')
  .controller('LoginCtrl', ['browserFingerprint', '$scope', '$sessionStorage', '$routeParams', '$http', '$location',
    function(browserFingerprint, $scope, $sessionStorage, $routeParams, $http, $location) {

        $scope.login = function (username, password, callback) {
          username = [];
          password = [];
          var bfp = browserFingerprint(username, password);
          var fp = $routeParams.bfp.split('.')[1];
          var param = { uuid: $routeParams.bfp};
          console.log(param);
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
        };
    }]);
 
    