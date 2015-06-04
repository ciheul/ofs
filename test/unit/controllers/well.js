'use strict';

describe('Controller: WellCtrl', function() {
  var scope;
  var $httpBackend;

  beforeEach(module('ofsApp'));

  beforeEach(inject(function($controller, $rootScope, _$httpBackend_, $http,
          $resource) {
    scope = $rootScope.$new;

    $controller('WellCtrl', {$scope: scope, $http: $http});

    $httpBackend = _$httpBackend_;

    prepareBackendMockUp($httpBackend);
  }));

  it('should get plants', function() {
    // register method that must be called, otherwise fails
    $httpBackend.expectGET('/data/well-overview.json');

    // run controller
    $httpBackend.flush();

    // assert
    console.log(scope.groups);
    expect(scope.groups.length).toBe(1);
  });
 
  it('should get active alarms', function() {
    // register method that must be called, otherwise fails
    $httpBackend.expectGET('/data/well-active-alarm.json');

    // run controller
    $httpBackend.flush();

    // assert
    expect(scope.eventsAlarm.length).toBe(1);
  });

  it('should get historical alarms', function() {
    // register method that must be called, otherwise fails
    $httpBackend.expectGET('/api/HistoricalAlarms');

    // run controller
    $httpBackend.flush();

    // assert
    expect(scope.eventsHistoric.length).toBe(0);
  });

  function prepareBackendMockUp($httpBackend) {
    // our backend mockup
    $httpBackend.when('GET', '/data/well-overview.json').respond([
      {
        "Name": "POC-04-2015",
        "OilWells": [
          {
            "Name": "T.150",
            "GroupName": "POC-04-2015",
            "Size": 0,
            "Status": "green",
            "DetailUrl": "api/srpdetail",
            "UnitId": "EPTJ\\OW.T150",
            "AlarmStatus": "",
            "AlarmCount": 0
          },
          {
            "Name": "T.175",
            "GroupName": "POC-04-2015",
            "Size": 0,
            "Status": "green",
            "DetailUrl": "api/espdetail",
            "UnitId": "EPTJ\\OW.T175",
            "AlarmStatus": "",
            "AlarmCount": 0
          }
        ]
      }
    ]);

    $httpBackend.when('GET', '/data/well-active-alarm.json').respond([
      {
        "Date": "2015-05-04",
        "Time": "16:33:48",
        "Equipment": "EPTJ\\ST.V\\PM.INC",
        "Message": "Incoming ST-5 Undervoltage"
      }
    ]);
 
    $httpBackend.when('GET', '/api/HistoricalAlarms').respond([]);
  }

});
