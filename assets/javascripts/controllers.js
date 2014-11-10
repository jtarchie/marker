(function(angular, google, undefined) {
  'use strict';

  var app = angular.module('myApp');

  app.controller('MapController', ['$scope', 'Route', 'Markers', 'UnitType', 'RouteType', function($scope, Route, Markers, UnitType, RouteType) {
    var routeType = new RouteType(),
        route = new Route(routeType),
        unitType = new UnitType(),
        markers = new Markers(route, unitType);

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

    $scope.reset = function() {
      route.removeAllCoordinates();
      markers.draw();
    };

    $scope.undo = function() {
      route.removeLastCoordinate();
      markers.draw();
    };

    $scope.toggleUnits = function() {
      unitType.toggleType();
      markers.draw();
    };

    $scope.route = route;
    $scope.unitType = unitType;
    $scope.markers = markers;
    $scope.routeType = routeType;
  }]);
})(angular, google);
