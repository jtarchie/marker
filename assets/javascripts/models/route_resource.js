(function(angular, google, document, undefined) {
  'use strict';

  var app = angular.module('myApp');


  app.service('RouteResource', ['$http', '$q', 'Route',function($http, $q, Route) {
    function createRouteFromFeatureCollection(featureCollection) {
      var route = new Route(),
      feature = featureCollection.features[0];

      feature.geometry.coordinates.forEach(function(coordinate) {
        var latLng = new google.maps.LatLng(coordinate[1], coordinate[0]);
        route.getPolyline().getPath().push(latLng);
      });
      route.id = feature.id;
      route.name = feature.properties.name;
      route.description = feature.properties.description;
      return route;
    }

    return {
      save: function(route) {
        var deferred = $q.defer(),
            map = new google.maps.Map(document.createElement('DIV'));
        map.data.add({
          geometry: new google.maps.Data.LineString(route.allCoordinates()),
          id: route.id,
          properties: {
            name: route.name,
            description: route.description
          }
        });
        map.data.toGeoJson(function(geoJson) {
          $http.post('/routes', geoJson)
            .success(function(featureCollection) {
              var route = createRouteFromFeatureCollection(featureCollection);
              deferred.resolve(route);
            });
        });

        return deferred.promise;
      },
      load: function(id) {
        var deferred = $q.defer();

        $http.get('/routes/' + id)
          .success(function(featureCollection) {
            var route = createRouteFromFeatureCollection(featureCollection);
            deferred.resolve(route);
          });

        return deferred.promise;
      }
    };
  }]);
})(angular, google, document);
