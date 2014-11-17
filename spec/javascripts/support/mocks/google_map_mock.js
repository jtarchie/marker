window.google = {
  maps: {
    geometry: {
      spherical: {
        computeDistanceBetween: function() {},
        computeHeading: function() {},
        computeOffset: function() {}
      }
    },
    Marker: function() {
      this.setMap = function() {};
      this.setVisible = function() {};
    },
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
