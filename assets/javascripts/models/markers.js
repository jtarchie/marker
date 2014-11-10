(function(angular, google, undefined) {
  'use strict';

  var app = angular.module('myApp');

  function Markers(route, userType) {
    this.route = route;
    this.visible = true;
    this.userType = userType;
    this.markers = [];
  }
  Markers.prototype.getVisible = function() {
    return this.visible;
  };
  Markers.prototype.toggleVisible = function() {
    this.visible = !this.visible;
    this.drawMarkers();
  };
  Markers.prototype.draw = function() {
    var coordinates = this.route.getPolyline().getPath().getArray().slice(0),
        totalDistance = 0,
        prevDistance = 0,
        expectedDistance = this.userType.conversionRate(),
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
        expectedDistance = this.userType.conversionRate() * (markers.length + 1);
      }
    }

    for(i = 0; i < this.markers.length; i+=1) {
      this.markers[i].setMap(null);
    }

    this.markers = markers;
    this.drawMarkers();
  };
  Markers.prototype.drawMarkers = function() {
    var self = this;
    this.markers.forEach(function(marker) {
      marker.setMap(self.route.getPolyline().getMap());
      marker.setVisible(self.visible);
    });
  };

  app.service('Markers', function() { return Markers; });
})(angular, google);
