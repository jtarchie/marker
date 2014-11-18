window.google = {
  maps: {
    Data: jasmine.createSpyObj('data', ['LineString']),
    geometry: {
      spherical: {
        computeDistanceBetween: function() {},
        computeHeading: function() {},
        computeOffset: function() {}
      }
    },
    Map: function() {
      this.data = {
        add: function() {},
        toGeoJson: function(callback) { callback({}); }
      };
    },
    Marker: function() {
      this.setMap = function() {};
      this.setVisible = function() {};
    },
    Polyline: function() {},
    TravelMode: {
      WALKING: 1,
      BICYCLING: 2
    },
    UnitSystem: {
      METRIC: 1,
      IMPERIAL: 2
    }
  }
};
