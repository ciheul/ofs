'use strict';

angular.module('OfsApp')
  .factory('browserFingerprint', ['$document',
  	function($document) {
  		var CryptoJS;
  		function getFingerprint() {

        var username;
        var password;

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
    		var script = $document.createElement('script');
    		script.src = 'CryptoMD5.js';
    		($document.head || $document.documentElement).appendChild(script);
    		script.parentNode.removeChild(script);
    		var cryptoObject = CryptoJS.MD5(navParam);
    		return cryptoObject.toString();
		}
  	}
  ]);