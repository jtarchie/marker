(function(angular, google, undefined) {
  'use strict';

  var app = angular.module('myApp');

  app.service('MapHandler', ['Route', 'Markers', 'UnitType', 'RouteType',
                     function(Route, Markers, UnitType, RouteType) {

    function MapHandler() {
      this.routeType = new RouteType();
      this.route = new Route(this.routeType);
      this.unitType = new UnitType();
      this.markers = new Markers(this.route, this.unitType);
    }
    MapHandler.prototype.setMap = function(map) {
      this.map = map;
    };
    MapHandler.prototype.applyToScope = function($scope) {
      $scope.routeType = this.routeType;
      $scope.route = this.route;
      $scope.unitType = this.unitType;
      $scope.markers = this.markers;
    };
    MapHandler.prototype.draw = function() {
      this.route.draw(this.map);
      this.markers.draw(this.map);
    };
    MapHandler.prototype.addCoordinate = function(latLng) {
      var self = this;
      this.route.addCoordinate(latLng).then(function() {
        self.draw();
      });
    };
    MapHandler.prototype.removeLastCoordinate = function() {
      this.route.removeLastCoordinate();
      this.draw();
    };
    MapHandler.prototype.clearCoordinates = function() {
      this.route.removeAllCoordinates();
      this.draw();
    };
    MapHandler.prototype.toggleUnits = function() {
      this.unitType.toggleType();
      this.draw();
    };
    MapHandler.prototype.setRoute = function(route) {
      this.route.draw(null);
      this.markers.draw(null);
      this.route = route;
      this.route.setRouteType(this.routeType);
      this.markers.setRoute(route);
    };
    MapHandler.prototype.bounds = function() {
      var bounds = new google.maps.LatLngBounds();
      this.route.allCoordinates().forEach(function(coordinate) {
        bounds.extend(coordinate);
      });
      return bounds;
    };

    return MapHandler;
  }]);
})(angular, google);
