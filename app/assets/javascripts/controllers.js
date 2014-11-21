(function(angular, google, undefined) {
  'use strict';

  var app = angular.module('myApp');

  app.controller('MapController', ['$scope', '$routeParams', '$location', 'MapHandler', 'RouteResource',
                 function($scope, $routeParams, $location, MapHandler, RouteResource) {

    var mapHandler = new MapHandler();
    mapHandler.applyToScope($scope);

    $scope.$watch('map', function() {
      mapHandler.setMap($scope.map);
    });

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
      mapHandler.addCoordinate(latLng);
    });

    $scope.reset = angular.bind(mapHandler, mapHandler.clearCoordinates);
    $scope.undo = angular.bind(mapHandler, mapHandler.removeLastCoordinate);
    $scope.toggleUnits = angular.bind(mapHandler, mapHandler.toggleUnits);

    $scope.save = function() {
      RouteResource.save(mapHandler.route).then(function(newRoute) {
        $location.path('/' + newRoute.id).replace();
      });
    };

    if($routeParams.id) {
      RouteResource.load($routeParams.id).then(function(newRoute) {
        mapHandler.setRoute(newRoute);
        mapHandler.draw();
        mapHandler.applyToScope($scope);
        $scope.map.fitBounds(mapHandler.bounds());
      });
    }
  }]);
})(angular, google);
