(function(angular, undefined) {
  'use strict';

  var app = angular.module('myApp');

  function UnitType() {
    this.type = UnitType.METRIC;
  }

  UnitType.prototype.isMetric = function() {
    return this.type === UnitType.METRIC;
  };

  UnitType.prototype.isImperial = function() {
    return this.type === UnitType.IMPERIAL;
  };

  UnitType.prototype.conversionRate = function() {
    if(this.isMetric()) {
      return 1000;
    } else {
      return 1609.34;
    }
  };

  UnitType.prototype.toggleType = function() {
    if(this.isMetric()) {
      this.type = UnitType.IMPERIAL;
    } else {
      this.type = UnitType.METRIC;
    }
  };

  UnitType.METRIC = google.maps.UnitSystem.METRIC;
  UnitType.IMPERIAL = google.maps.UnitSystem.IMPERIAL;

  app.service('UnitType', function() {
    return UnitType;
  });

})(angular, google);
