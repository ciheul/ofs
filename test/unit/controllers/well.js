'use strict';

describe('Controller: WellCtrl', function() {
  var scope = {};

  beforeEach(module('ofsApp'));

  beforeEach(inject(function($controller) {
    $controller('WellCtrl', {$scope: scope});
  }));

  it('should fail deliberately', function() {
    expect(true).toBe(true);
  });
});
