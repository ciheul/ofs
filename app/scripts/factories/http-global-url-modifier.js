'use strict';

angular.module('ofsApp')
  .factory('httpGlobalUrlModifier', 
    function(HOST, browserFingerprint) {
    return {
      request: function(config, username, password) {
        // console.log('before:' + config.url);
        var uuid = browserFingerprint.getFingerprint(username, password);

        if (HOST.DEBUG === true && 
            config.url.indexOf('views') < 0 &&
            config.url.indexOf('html') < 0 &&
            config.url.indexOf('http') < 0 && 
            config.url.indexOf('localhost') < 0) {
          // remove first slash ('/') occurence
          if (config.url.charAt(0) === '/') {
            config.url = config.url.substring(1);
          }
          config.url = HOST.BASE_URL + ':' + HOST.PORT + '/' + config.url + '/' + '?uuid=' + uuid;
        }

        // console.log('after: ' + config.url);

        return config;
      }
    };
  });
