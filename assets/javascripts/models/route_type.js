(function(angular, google, undefined) {
  'use strict';

  var app = angular.module('myApp'),
    types = {
      WALKING: 'WALKING',
      BICYCLING: 'BICYCLING',
      MANUAL: 'MANUAL'
    };

  function RouteType() {
    this.toggleWalking();
  }

  RouteType.prototype.getGoogleConst = function() {
    if(this.isWalking()) {
      return google.maps.TravelMode.WALKING;
    } else if(this.isBicycling()) {
      return google.maps.TravelMode.BICYCLING;
    }
  };

  var createHelperFuncs = function(key, funcName) {
    RouteType.prototype['is' + funcName] = function() {
      return this.type === types[key];
    };
    RouteType.prototype['toggle' + funcName] = function() {
      this.type = types[key];
    };
  };

  for(var key in types) {
    if(types.hasOwnProperty(key)) {
      var funcName = key.substr(0, 1).toUpperCase() + key.substr(1).toLowerCase();
      createHelperFuncs(key, funcName);
    }
  }

  app.service('RouteType', function() {
    return RouteType;
  });
})(angular, google);
