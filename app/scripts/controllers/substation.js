'use strict';

/* ofs-well */

angular.module('ofsApp')
  .controller('SubstationCtrl', ['$scope', '$rootScope', '$http', '$interval', 
    function($scope, $rootScope, $http, $interval) {

    var map = null;
    $scope.eventsAlarm = [];
    
    $scope.GetMap = function()
    {
      console.log('debug');
      map = new Microsoft.Maps.Map(document.getElementById('mapDiv2'), {credentials: 'AmSRI0ujkP_9tyTGJVQxuuXTEnX6dumwkQyflm7aqzbOCLVZ-lRGRosGueF8Cf2v', center: new Microsoft.Maps.Location(47.5, -122.3), zoom: 9 });

      Microsoft.Maps.loadModule('Microsoft.Maps.Search');

    };


   /* function searchModuleLoaded()
    {
      var searchManager = new Microsoft.Maps.Search.SearchManager(map);

      var searchRequest = {query:"pizza in Seattle, WA", count: 5, callback:searchCallback, errorCallback:searchError};
      searchManager.search(searchRequest);
    }*/

    

     /* function searchError(searchRequest)
      {
        alert('An error occurred.');
      }*/

      
      /* plants get data */
      $scope.loadWell = function() {
        $/*scope.isLoaded = true;*/
        $scope.prograssing = true;
        $http.get('/api/substationOverview')/*http://localhost:3000/api/wells*/
          .success(function(data) {
            /*$scope.isLoaded = false;*/
            $scope.prograssing = false;
            $scope.alert = false; 
            $scope.totalWells = data;
          })
          .error(function(data) {
            $scope.alert = data ||'Request Failed From Server';
            $scope.prograssing = false;
            console.log(data);
          });
      };
  
      $scope.pollSubstations = $interval(function() {
       // $http.get('/api/substationOverview')/*http://localhost:3000/api/wells*/
        // .success(function(data) {
          $scope.loadWell();
        // });
      }, 10000);

      /* interval Active Alarm */
      $scope.loadAlarm = function() {
        $scope.prograssing = true;
        $http.get('/api/substationOverview/ActiveAlarms')
          .success(function(data){
            $scope.prograssing = false;
            $scope.eventsAlarm = data;

            $scope.getCount = function(){
              return $scope.eventsAlarm.length;
              /*return 0;*/
            };

            $scope.count = function(){
              $rootScope.$broadcast('ping',{
                ping:$scope.getCount
              });
            };
          })
          .error(function(data){
            $scope.prograssing = false;
          });
      };
      $scope.spinAlarms = $scope.loadAlarm();

      $scope.pollActiveAlarms = $interval(function() {
        $http.get('/api/substationOverview/ActiveAlarms')
        .success(function(data) {
          $scope.eventsAlarm = data;
        })
        .error(function(data) {
          $scope.prograssing = false;
          console.log(data);
        });
      }, 10000);

       /* interval Historical Alarm */
      $http.get('/api/substationOverview/HistoricalAlarms')
        .success(function(data) {
          $scope.eventsHistoric = data;
        })
        .error(function(){
          $scope.eventsHistoric = 0;
        });

      $scope.filterAlarm = function(start, end) {
        console.log('hello');
        console.log(start);
        console.log(end);
        
        console.log($scope.start);
        console.log($scope.end);

        console.log(this.start);
        console.log(this.end);
        start = start.replace(/\./g, '');
        end = end.replace(/\./g, '');
        var params = {dtfrom: start + '000000', dtto: end + '000000'};
        $http.get('', {params: params})
        .success(function(data){
          console.log(data);
          $scope.eventsHistoric = data;
        });
      };

      // when routes changes, cancel all interval operations
      $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.pollSubstations);
        $interval.cancel($scope.pollActiveAlarms);
      });
}]);

 
  
  
/*end of ofs-well*/

/*SRP-DETAIL*/

