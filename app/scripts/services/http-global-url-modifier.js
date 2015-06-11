'use strict';

angular.module('ofsApp')
  .factory('httpGlobalUrlModifier', function(HOST) {
    return {
      request: function(config) {
        if (HOST.DEBUG === true && config.url.indexOf('views') <= 0
            && config.url.indexOf('html') <= 0) {
          config.url = HOST.BASE_URL + ':' + HOST.PORT + config.url;
        }
        return config;
      }
    };
  });
