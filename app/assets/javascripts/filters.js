(function(angular) {
  'use strict';

  var app = angular.module('myApp');

  app.filter('unit', function() {
    return function(meters, unitType) {
      return meters / unitType.conversionRate();
    };
  });

  app.filter('unitAbbr', function() {
    return function(unitType) {
      if(unitType.isMetric()) {
        return 'km';
      } else {
        return 'miles';
      }
    };
  });
})(angular);
