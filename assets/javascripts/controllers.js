(function(angular, google) {
  'use strict';

  var app = angular.module('myApp');

  app.controller('MapController', ['$scope', function($scope) {
    $scope.$on('places:changed', function(_event, place) {
      var map = $scope.map;
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
    });
  }]);
})(angular, google);
