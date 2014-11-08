(function(angular, google, undefined) {
  'use strict';

  var app = angular.module('myApp');

  function Route() {
    this.polyline = new google.maps.Polyline({
      geodesic: true
    });
    this.routeType = google.maps.TravelMode.WALKING;
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

  app.service('Route', ['$q', function($q) {
    Route.prototype.addLatLng = function(latLng) {
      var path = this.polyline.getPath(),
          deferred = $q.defer();

      if(path.getLength() === 0 || this.routeType === 'NOTHING') {
        setTimeout(deferred.resolve, 0);
        return deferred.promise.then(function() {
          path.push(latLng);
        });
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
          deferred.resolve();
        });

        return deferred.promise;
      }
    };

    return Route;
  }]);

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
    var coordinates = this.polyline.getPath().getArray().slice(0),
        totalDistance = 0,
        prevDistance = 0,
        expectedDistance = this.distanceBetween,
        markers = [];
    for(var i = 1; i < coordinates.length; i++) {
      var prevLatLng = coordinates[ i-1 ],
          thisLatLng = coordinates[ i ];

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
              icon: 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld='+ (markers.length + 1).toString() +'|FF0000|000000',
              title: (markers.length + 1).toString()
            });
        markers.push(marker);
        coordinates.splice(i, 0, markerLocation);
        totalDistance -= google.maps.geometry.spherical.computeDistanceBetween(markerLocation, thisLatLng);
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
