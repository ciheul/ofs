'use strict';

angular.module('ofsApp')
  .factory('browserFingerprint', ['$document', 
    function($document){
        return {
  		    getFingerprint: function (username, password) {

    		  var isIE = (navigator.userAgent.indexOf('MSIE') !== -1);
    		  var navParam = + username + ';' + password + ';' + navigator.userAgent + ';' + navigator.appCodeName + ';' + navigator.appName + ';' + 
    		  navigator.appVersion + ';' + navigator.mimeTypes + ';' + navigator.platform + ';' + 
        	   navigator.product + ';' + navigator.userAgent;
    		  if (isIE) {
        		  navParam += ';' + username + ';' + password + ';' + navigator.userLanguage + ';' + navigator.systemLanguage;
    		  }
    		  else {
        	   navParam += ';' + navigator.languageanguage;
    	       	}
    		  var script = $document[0].createElement('script');
    		  script.src = 'scripts/vendors/CryptoMD5.js';
    		  ($document[0].head || $document[0].documentElement).appendChild(script);
    		  script.parentNode.removeChild(script);
    		  var cryptoObject = CryptoJS.MD5(navParam);
    		  return cryptoObject.toString();
		    }
        };
    }
  ]);