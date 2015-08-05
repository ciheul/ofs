'use strict';

angular.module('ofsApp')
.controller('SirkuitCtrl', function($scope) {
  $scope.sketch = function(processing) {
    processing.setup = function() { 
    processing.size(400, 300);
    processing.frameRate(60);
  	};
    processing.draw = function() { 
    	processing.line(30, 20, 5000, 20);
		/*processing.stroke(126);*/
		processing.line(85, 20, 85, 75);
		/*processing.stroke(255);*/
		processing.line(85, 75, 30, 75);
		processing.line.color('black');
		processing.background('white');
    };
  };
});