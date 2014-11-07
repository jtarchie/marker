(function(angular, google, undefined) {
  'use strict';

  var app = angular.module('myApp');

  function Route() {
    this.polyline = new google.maps.Polyline({
      geodesic: true
    });
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
        if(status === google.maps.DirectionsStatus.OK) {
          response.routes[0].overview_path.forEach(function(latLng) {
            path.push(latLng);
          });
        }
      });
    }
  };
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

  app.service('Route', function() { return Route; });

  function Markers(polyline) {
    this.polyline = polyline;
    this.visible = true;
    this.distanceBetween = 1609.34;
    this.markers = [];
  }
  Markers.prototype.getVisible = function() {
    return this.visible;
  };
  Markers.prototype.setVisible = function(visible) {
    this.visible = visible;
    this.drawMarkers();
  };
  Markers.prototype.draw = function() {
    var path = this.polyline.getPath(),
        totalDistance = 0,
        prevDistance = 0,
        expectedDistance = this.distanceBetween,
        markers = [];
    for(var i = 1; i < path.getLength(); i++) {
      var prevLatLng = path.getAt(i-1),
          thisLatLng = path.getAt(i);

      prevDistance = totalDistance;
      totalDistance += google.maps.geometry.spherical.computeDistanceBetween(prevLatLng, thisLatLng);

      if(totalDistance >= expectedDistance) {
        var distanceFromPrev = expectedDistance - prevDistance,
            markerLocation = google.maps.geometry.spherical.computeOffset(
              prevLatLng,
              distanceFromPrev,
              google.maps.geometry.spherical.computeHeading(prevLatLng,thisLatLng)
            ),
            marker = new google.maps.Marker({
              position: markerLocation,
              title: (markers.length + 1).toString()
            });
        markers.push(marker);
        expectedDistance = this.distanceBetween * (markers.length + 1);
      }
    }

    for(var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }

    this.markers = markers;
    this.drawMarkers();
  };
  Markers.prototype.drawMarkers = function() {
    var self = this;
    this.markers.forEach(function(marker) {
      marker.setMap(self.polyline.getMap());
      marker.setVisible(self.visible);
    });
  };

  app.service('Markers', function() { return Markers; });
})(angular, google);
