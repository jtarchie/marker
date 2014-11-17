describe('RouteType', function() {
  'use strict';

  beforeEach(function() {
    module('myApp');
  });


  describe('initialization', function() {
    var routeType;

    beforeEach(inject(function(RouteType) {
      routeType = new RouteType();
    }));

    it('starts as walking', function() {
      expect(routeType.isWalking()).toBeTruthy();
    });

    it('can change to bicycling', function() {
      expect(routeType.isBicycling()).toBeFalsy();
      routeType.toggleBicycling();
      expect(routeType.isBicycling()).toBeTruthy();
    });

    it('can change to manual', function() {
      expect(routeType.isManual()).toBeFalsy();
      routeType.toggleManual();
      expect(routeType.isManual()).toBeTruthy();
    });

    describe('the constants associated with Google Maps', function() {
      it('returns for walking', function() {
        expect(routeType.getGoogleConst()).toEqual(1);
      });

      it('returns for bicycling', function() {
        routeType.toggleBicycling();
        expect(routeType.getGoogleConst()).toEqual(2);
      });
    });
  });
});
