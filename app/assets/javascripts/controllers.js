(function(angular, google, undefined) {
  'use strict';

  var app = angular.module('myApp');

  app.controller('MapController', ['$scope', '$routeParams', '$location', 'Route', 'Markers', 'UnitType', 'RouteType', 'RouteResource',
                 function($scope, $routeParams, $location, Route, Markers, UnitType, RouteType, RouteResource) {
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
        $scope.route.getPolyline().setMap($scope.map);
        $scope.markers.draw();
      });
    });

    $scope.reset = function() {
      $scope.route.removeAllCoordinates();
      $scope.markers.draw();
    };

    $scope.undo = function() {
      $scope.route.removeLastCoordinate();
      $scope.markers.draw();
    };

    $scope.toggleUnits = function() {
      $scope.unitType.toggleType();
      $scope.markers.draw();
    };

    $scope.save = function() {
      RouteResource.save($scope.route).then(function(newRoute) {
        $scope.route = newRoute;
        $scope.route.routeType = routeType;
        $scope.markers = new Markers(route, unitType);
        $location.path('/' + $scope.route.id).replace();
      });
    };

    if($routeParams.id) {
      RouteResource.load($routeParams.id).then(function(newRoute) {
        $scope.route = newRoute;
        $scope.route.routeType = routeType;
        $scope.route.getPolyline().setMap($scope.map);
        $scope.markers = new Markers($scope.route, unitType);
        $scope.markers.draw();
        var bounds = new google.maps.LatLngBounds();
        $scope.route.allCoordinates().forEach(function(coordinate) {
          bounds.extend(coordinate);
        });
        $scope.map.fitBounds(bounds);
      });
    }

    $scope.route = route;
    $scope.unitType = unitType;
    $scope.markers = markers;
    $scope.routeType = routeType;
  }]);
})(angular, google);
