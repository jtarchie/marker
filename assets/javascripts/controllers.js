(function(angular, google, undefined) {
  'use strict';

  var app = angular.module('myApp');

  app.controller('MapController', ['$scope', 'Route', 'Markers', function($scope, Route, Markers) {
    var route = new Route(),
        markers = new Markers(route);

    $scope.$on('places:changed', function(_event, place) {
      var map = $scope.map;
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
    });

    $scope.$on('map:click', function(event, latLng) {
      route.addCoordinate(latLng).then(function() {
        route.getPolyline().setMap($scope.map);
        markers.draw();
      });
    });

    $scope.$watch('routeType', function() {
      route.setRouteType($scope.routeType);
    });

    $scope.$watch('showMapMarkers', function() {
      markers.setVisible($scope.showMapMarkers);
    });

    $scope.reset = function() {
      route.removeAllCoordinates();
      markers.draw();
    };

    $scope.undo = function() {
      route.removeLastCoordinate();
      markers.draw();
    };

    $scope.route = route;
    $scope.unitType = google.maps.UnitSystem.METRIC;
    $scope.routeType = route.getRouteType();
    $scope.showMapMarkers = markers.getVisible();
  }]);
})(angular, google);
