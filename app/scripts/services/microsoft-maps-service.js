'use strict';

angular.module('ofsApp')
  .factory('microsoftService', ['$document', '$q', '$rootScope',
    function($document, $q, $rootScope) {
      var d = $q.defer();

      function onScriptLoad() {
        // Load client in the browser
        $rootScope.$apply(function() {
          d.resolve(window.Microsoft);
        });
      }

      // Create a script tag with d3 as the source
      // and call our onScriptLoad callback when it
      // has been loaded
      var scriptTag = $document[0].createElement('script');
      scriptTag.type = 'text/javascript'; 
      scriptTag.async = true;
      scriptTag.src = 'http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0';
      scriptTag.onreadystatechange = function () {
        if (this.readyState === 'complete') { onScriptLoad(); }
      };
      scriptTag.onload = onScriptLoad;

      var s = $document[0].getElementsByTagName('body')[0];
      s.appendChild(scriptTag);

      return {
        X: function() { return d.promise; }
      };
    }]);
