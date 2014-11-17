describe('Markers', function() {
  'use strict';

  beforeEach(function() {
    module('myApp');
  });

  describe('visiblity of the markers', function() {
    var markers;

    beforeEach(inject(function(Markers) {
      markers = new Markers();
    }));

    it('is initally visible', function() {
      expect(markers.getVisible()).toBeTruthy();
    });
  });
});
