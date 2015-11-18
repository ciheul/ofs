'use strict';

angular.module('ofsApp')
  .controller('TrendCtrl', ['$scope', '$rootScope', '$http', '$routeParams',
    function($scope, $rootScope, $http, $routeParams) {

      function convertDatetime(d) {
        var month = d.getMonth() + 1;
        if (month < 10) {
          month = '0' + month;
        }

        var date = d.getDate();
        if (date < 10) {
          date = '0' + date;
        }

        return d.getFullYear() + '.' + month + '.' + date; 
      }

      /* trending */
      $scope.isTrendingLoaded = false;
      $scope.filterTrending = function(startTrend, endTrend) {
        startTrend = startTrend.replace(/\./g, '');
        endTrend = endTrend.replace(/\./g, '');

        var params = {
          unitId: $routeParams.UnitId,
          dtfrom: startTrend + '000000',
          dtto: endTrend + '000000'
        };

        $scope.isFilteringSRP = true;
        //http://teleconscada-web00.cloudapp.net:1980/api/SRPTrending/?unitId=EPTJ%5COW.T150&dtfrom=20150506160000&dtto=20150507160000
        // $http.get('data/trend.json')
        $http.get('/api/SRPTrending', { params: params })
        // $http.get('http://localhost:19000/data/trend.json')
          .success(function(data) {
            $scope.dataTrend = data;
            $scope.isFilteringSRP = false;
            $scope.isTrendingLoaded = true;
          })
          .error(function(data) {
            data = null;
            $scope.isTrendingLoaded = false;
            $scope.isFilteringSRP = false;
          });
      };

      $scope.loadTrending = function() {
        // current time
        var now = new Date();

        // yesterday from 00:00:00
        var yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        yesterday.setHours(0);
        yesterday.setMinutes(0);
        yesterday.setSeconds(0);

        $scope.startTrend = convertDatetime(yesterday);
        $scope.endTrend = convertDatetime(now);

        $scope.filterTrending($scope.startTrend, $scope.endTrend);
      };
      $scope.loadTrending();

    }
  ]);
