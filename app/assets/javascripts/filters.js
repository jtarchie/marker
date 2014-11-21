(function(angular) {
  'use strict';

  var app = angular.module('myApp');

  app.filter('unit', function() {
    return function(meters, unitType) {
      if(!unitType) { return ; }
      return meters / unitType.conversionRate();
    };
  });

  app.filter('unitAbbr', function() {
    return function(unitType) {
      if(!unitType) { return; }
      if(unitType.isMetric()) {
        return 'km';
      } else {
        return 'miles';
      }
    };
  });
})(angular);
