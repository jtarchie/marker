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
      expect(unitType.conversionRate()).toEqual(1000);
    });

    it('is not imperial units', function() {
      expect(unitType.isImperial()).toBeFalsy();
    });

    describe('when toggling between units', function() {
      beforeEach(function() {
        unitType.toggleType();
      });

      it('turns to imperial units', function() {
        expect(unitType.isImperial()).toBeTruthy();
        expect(unitType.conversionRate()).toEqual(1609.34);
      });
    });
  });
});

