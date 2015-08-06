'use strict';

angular.module('ofsApp')
.directive('virgenProcessing',
 function() {
  return function(scope, iElement, iAttr) {
    scope.$processing = new Processing(iElement[0], scope[iAttr.virgenProcessing]);
  };
});