describe('Markers', function() {
  'use strict';

  beforeEach(function() {
    module('myApp');
  });

  describe('initialization', function() {
    var markers, unitType, route;

    beforeEach(inject(function(Markers) {
      route = {
        allCoordinates: function() { return [{}, {}]; },
        getMap: function() {}
      };
      unitType = {
        conversionRate: function() { return 1; }
      };
      markers = new Markers(route, unitType);
    }));

    it('is initally visible', function() {
      expect(markers.getVisible()).toBeTruthy();
    });

    it('can toggle visibility', function() {
      markers.toggleVisible();
      expect(markers.getVisible()).toBeFalsy();
    });

    describe('when drawing markers', function() {
      beforeEach(function() {
        spyOn(google.maps, 'Marker').and.callThrough();
      });

      describe('with a route of 10 meters and a marker distance of 1 meter', function() {
        it('draws a ten markers', function() {
          spyOn(google.maps.geometry.spherical, 'computeDistanceBetween').and.returnValue(10);
          markers.draw();
          expect(markers.markers.length).toEqual(10);
        });
      });

      describe('with a route of 1 meter and marker distance of 1 meter', function() {
        var position;

        beforeEach(function() {
          position = jasmine.createSpy();
          spyOn(google.maps.geometry.spherical, 'computeDistanceBetween').and.returnValue(1);
          spyOn(google.maps.geometry.spherical, 'computeOffset').and.returnValue(position);
          markers.draw();
        });

        it('draws a one markers', function() {
          expect(markers.markers.length).toEqual(1);
        });

        it('draws markers with a mile number and position', function() {
          expect(google.maps.Marker).toHaveBeenCalledWith({
            position: position,
            icon: 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=1|FF0000|000000',
            title: '1'
          });
        });
      });
    });
  });
});
