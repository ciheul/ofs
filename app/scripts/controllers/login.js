'use strict';

angular.module('ofsApp')
  .controller('LoginCtrl',
    ['$scope', '$rootScope', '$location',
    function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
        /*AuthenticationService.ClearCredentials();
 */
       /* $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('#/well');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };*/

        $scope.login = function(){
        	if ($scope.username === 'test' || $scope.password === 'test') {
        		console.log('login berhasil');
        		$location.path('#/well');
        	} else {
        		console.log('error');
        	}
        };
    }]);