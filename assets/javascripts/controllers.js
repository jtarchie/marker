(function(angular, google, undefined) {
  'use strict';

  var app = angular.module('myApp');

  app.controller('MapController', ['$scope', 'Route', function($scope, Route) {
    var route = new Route();

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
      route.addLatLng(latLng);
      $scope.$apply();
      route.getPolyline().setMap($scope.map);
    });

    $scope.route = route;
    $scope.unitType = google.maps.UnitSystem.METRIC;
    $scope.routeType = route.getRouteType();
    $scope.$watch('routeType', function() {
      $scope.route.setRouteType($scope.routeType);
    });
  }]);
})(angular, google);
