(function(angular, google, undefined) {
  'use strict';

  var app = angular.module('myApp');

  function Markers(route, unitType) {
    this.route = route;
    this.visible = true;
    this.unitType = unitType;
    this.markers = [];
  }
  Markers.prototype.getVisible = function() {
    return this.visible;
  };
  Markers.prototype.toggleVisible = function() {
    var self = this;
    this.visible = !this.visible;
    this.markers.forEach(function(marker) {
      marker.setVisible(self.visible);
    });
  };
  Markers.prototype.draw = function(map) {
    var coordinates = this.route.allCoordinates().slice(0),
        totalDistance = 0,
        prevDistance = 0,
        expectedDistance = this.unitType.conversionRate(),
        markers = [];
    for(var i = 1; i < coordinates.length; i+=1) {
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
        expectedDistance = this.unitType.conversionRate() * (markers.length + 1);
      }
    }

    for(i = 0; i < this.markers.length; i+=1) {
      this.markers[i].setMap(null);
    }

    this.markers = markers;
    this._drawMarkers(map);
  };
  Markers.prototype.setRoute = function(route) {
    this.route = route;
  };
  Markers.prototype._drawMarkers = function(map) {
    var self = this;
    this.markers.forEach(function(marker) {
      marker.setMap(map);
      marker.setVisible(self.visible);
    });
  };

  app.service('Markers', function() { return Markers; });
})(angular, google);
