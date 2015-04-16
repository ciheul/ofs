var ofsControllers = angular.module('ofsControllers', []);

ofsApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['Access-Control-Allow-Origin','*'];
  }
  ]);

ofsControllers.controller('ofsListCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get("http://localhost:3000/api/wells").success(function(data) {
    $scope.plants = data;
    console.log(data);
  });
 

/*  $scope.result= { total : 0, green : 0, black : 0, yellow : 0, red : 0, gray : 0 };
  $scope.count = function(totalWells) {
    console.log("debug 1");
    for (var i = 0; i < totalWells.length; i++) {
      for(var j = 0; j < totalWells[i].wells.length; j++) {
        if (totalWells[i].wells[j].status === 'black') {
          $scope.result.black += 1;
        }
        if (totalWells[i].wells[j].status === 'yellow') {
          $scope.result.yellow += 1;
        }
        if (totalWells[i].wells[j].status === 'gray') {
          $scope.result.gray += 1;
        }
         if (totalWells[i].wells[j].status === 'green') {
          $scope.result.green += 1;
        }
        if (totalWells[i].wells[j].status === 'red') {
          $scope.result.red += 1;
        }
        $scope.result.total = ($scope.result.black + 
          $scope.result.yellow +
          $scope.result.green +
          $scope.result.gray 
        )
      }
    }; */

  /*console.log($scope.result);
  console.log("debug 2");
  }
  $scope.count($scope.totalWells);*/
}]);

ofsControllers.controller('electricalCtrl', function ($scope){
    $scope.totalElectrical = [
    {   
        'name': 'ST. P. PLANT 1',
        'incoming':'I.87R',
        'trafo':'T.87R'
    },
    ];
});

