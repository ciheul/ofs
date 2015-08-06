'use strict';

angular.module('ofsApp')
.controller('SirkuitCtrl', function($http, $scope) {

  /*$http.get('/api/SubstationOverview/SubstationUnit')
      .success(function(data) {
          if (data.name === 'POWER METER') {
            $scope.powerMeter = (50, 250, 50, 300);
          }
      });*/

  $scope.sketch = function(processing) {
    processing.setup = function() { 
    processing.size(1000, 1000);
    processing.frameRate(60);
    processing.background('grey');
  	};
    processing.draw = function(powerMeter) { 
    processing.line(50, 250, 650, 250);
    /*processing.line($scope.powerMeter);*/
    processing.line(50, 250, 50, 300);
    processing.line(50, 320, 50, 500);
    processing.line(340, 50, 340, 75);
    processing.line(340, 250, 340, 180);
    processing.line(340, 100, 340, 150);

    processing.triangle(340, 50, 330, 40, 350, 40);
    processing.triangle(50, 500, 40, 490, 60, 490);

    processing.ellipse(340, 75, 25, 25);
    processing.ellipse(340, 90, 25, 25);
    };

  };
});