describe('UnitType', function() {
  'use strict';

  beforeEach(function() {
    module('myApp');
  });

  describe('initialization', function() {
    var unitType;

    beforeEach(inject(function(UnitType) {
      unitType = new UnitType();
    }));

    it('defaults as metric', function() {
      expect(unitType.isMetric()).toBeTruthy();
    });
  });
});

