(function(angular) {
  'use strict';

  var app = angular.module('myApp');

  app.filter('unit', function() {
    return function(meters, unitType) {
      unitType = unitType || google.maps.UnitSystem.METRIC;

      if(unitType === google.maps.UnitSystem.METRIC) {
        return meters / 1000;
      } else {
        return meters / 1609.34;
      }
    }
  });

  app.filter('unitAbbr', function() {
    return function(unitType) {
      unitType = unitType || google.maps.UnitSystem.METRIC;

      if(unitType === google.maps.UnitSystem.METRIC) {
        return 'km';
      } else {
        return 'miles';
      }
    }
  });
})(angular);
