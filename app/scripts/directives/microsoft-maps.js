'use strict';

angular.module('ofsApp')
  .directive('microsoftMaps', ['microsoftService', function(microsoftService) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope = null;
        element = null;
        attrs = null;

        microsoftService.X().then(function(Microsoft) {
          var el = document.getElementById('map-div');
          new Microsoft.Maps.Map(el, {credentials: 'AmSRI0ujkP_9tyTGJVQxuuXTEnX6dumwkQyflm7aqzbOCLVZ-lRGRosGueF8Cf2v', center: new Microsoft.Maps.Location(47.5, -122.3), zoom: 9 });

          Microsoft.Maps.loadModule('Microsoft.Maps.Search');

          // function searchModuleLoaded() {
          //   var searchManager = new Microsoft.Maps.Search.SearchManager(map);
          //
          //   #<{(|var searchRequest = {query:"pizza in Seattle, WA", count: 5, callback:searchCallback, errorCallback:searchError};
          //   searchManager.search(searchRequest);|)}>#
          // }
          //
          // function searchError(searchRequest) {
          //   alert('An error occurred.');
          // }
        });
      }
    };
  }]);
