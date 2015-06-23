'use strict';

angular.module('ofsApp')
  .factory('microsoftService', ['$document', '$q', 
    function($document, $q) {
      var d = $q.defer();

      function onScriptLoad() {
        // Load client in the browser
        // $rootScope.$apply(function() {
        // d.resolve(window.Microsoft);
        // });
        d.resolve(window.Microsoft);
      }

      // Create a script tag with Microsoft as the source
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
    }])
  .factory('d3Service', ['$document', '$q',
    function($document, $q) {
      var d = $q.defer();

      function onScriptLoad() {
        // Load client in the browser
        //$rootScope.$apply(function() {
        //  d.resolve(window.d3);
        //});
        d.resolve(window.d3);
      }

      // Create a script tag with d3 as the source
      // and call our onScriptLoad callback when it
      // has been loaded
      var scriptTag = $document[0].createElement('script');
      scriptTag.type = 'text/javascript'; 
      scriptTag.async = true;
      scriptTag.src = 'http://d3js.org/d3.v3.min.js';
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
