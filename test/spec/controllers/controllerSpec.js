'use strict';

describe('ofs controllers', function() {

describe('ofsListCtrl',function(){

  var scope, ctrk, $httpBackend;

  beforeEach(module('ofsControllers'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
	$httpBackend = _$httpBackend_;
	$httpBackend.expectGET('http://localhost:3000/api/wells').
	  respond([
	  	{name: 'ST. P. PLANT 1'}, 
	  	{name: 'ST. P. PLANT 2'}, 
	  	{name: 'ST. P. PLANT 3'},
	  	{name: 'ST. P. PLANT 4'},
	  	{name: 'ST. P. PLANT 5'},
	  	{name: 'ST. P. PLANT 6'},
	  	{name: 'ST. P. PLANT 7'},
	  	{name: 'ST. P. PLANT 8'}
	  ]);
	  $httpBackend.expectGET('http://localhost:3000/api/events').
	  respond([
	  	{type: '1'}
	  ]);
	  scope = $rootScope.$new();
      ctrl = $controller('ofsListCtrl', {$scope: scope});
  }));
});
});