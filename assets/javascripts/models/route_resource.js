(function(angular, google, document, undefined) {
  'use strict';

  var app = angular.module('myApp');

  app.service('RouteResource', ['$http', function($http) {
    return {
      save: function(route) {
        var map = new google.maps.Map(document.createElement('DIV'));
        map.data.add({
          geometry: new google.maps.Data.LineString(route.allCoordinates())
        });
        var geoJson;
        map.data.toGeoJson(function(geoJson) {
          $http.post('/routes', geoJson)
            .success(function(data) {
              // console.log('success');
            });
        });
      }
    };
  }]);
})(angular, google, document);
