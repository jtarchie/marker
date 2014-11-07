(function(angular, google, undefined) {
  'use strict';

  var app = angular.module('myApp');

  function Route() {
    this.polyline = new google.maps.Polyline();
    this.routeType = google.maps.TravelMode.WALKING;
  }
  Route.prototype.addLatLng = function(latLng) {
    var path = this.polyline.getPath();
    if(path.getLength() === 0 || this.routeType === 'NOTHING') {
      path.push(latLng);
    } else {
      var directionsService = new google.maps.DirectionsService();
      directionsService.route({
        origin: path.getAt(path.getLength() - 1),
        destination: latLng,
        travelMode: this.routeType
      }, function(response, status) {
        console.log(response, status);
        if(status == google.maps.DirectionsStatus.OK) {
          response.routes[0].overview_path.forEach(function(latLng) {
            path.push(latLng);
          });
        }
      });
    }
  }
  Route.prototype.totalDistance = function() {
    return google.maps.geometry.spherical.computeLength(this.polyline.getPath());
  };
  Route.prototype.getPolyline = function() {
    return this.polyline;
  };
  Route.prototype.setRouteType = function(routeType) {
    this.routeType = routeType;
  };
  Route.prototype.getRouteType = function() {
    return this.routeType;
  };

  app.service('Route', function() { return Route });
})(angular, google);
