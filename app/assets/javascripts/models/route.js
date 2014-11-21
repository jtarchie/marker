(function(angular, google, undefined) {
  'use strict';

  function newPolyline(route) {
    route.polyline = new google.maps.Polyline({
      geodesic: true
    });
  }

  var app = angular.module('myApp');

  function Route(routeType) {
    newPolyline(this);
    this.routeType = routeType;
    this.userCapturedCoordinates = [];
  }
  Route.prototype.totalDistance = function() {
    return google.maps.geometry.spherical.computeLength(this.polyline.getPath());
  };
  Route.prototype.getPolyline = function() {
    return this.polyline;
  };
  Route.prototype.removeAllCoordinates = function() {
    this.polyline.setMap(null);
    delete(this.polyline);
    newPolyline(this);
  };
  Route.prototype.removeLastCoordinate = function() {
    var path = this.polyline.getPath(),
        lastCoordinate = this.userCapturedCoordinates.pop();

    if(!lastCoordinate) { return; }

    for(var i = path.getLength() - 1; i >= 0; i-=1) {
      var coordinate = path.getAt(i);
      path.removeAt(i);
      if(lastCoordinate.equals(coordinate)) {
        return;
      }
    }
  };
  Route.prototype.allCoordinates = function() {
    return this.polyline.getPath().getArray();
  };
  Route.prototype.toString = function() {
    return '[Object Route]';
  };
  Route.prototype.draw = function(map) {
    this.polyline.setMap(map);
  };
  Route.prototype.setRouteType = function(routeType) {
    this.routeType = routeType;
  };

  app.service('Route', ['$q', function($q) {
    Route.prototype.addCoordinate = function(latLng) {
      var path = this.polyline.getPath(),
          deferred = $q.defer(),
          self = this;


      if(path.getLength() === 0 || this.routeType.isManual()) {
        setTimeout(deferred.resolve, 0);
        return deferred.promise.then(function() {
          self.userCapturedCoordinates.push(latLng);
          path.push(latLng);
        });
      } else {
        var directionsService = new google.maps.DirectionsService();
        directionsService.route({
          origin: path.getAt(path.getLength() - 1),
          destination: latLng,
          travelMode: this.routeType.getGoogleConst()
        }, function(response, status) {
          if(status === google.maps.DirectionsStatus.OK) {
            self.userCapturedCoordinates.push(response.routes[0].overview_path[0]);
            response.routes[0].overview_path.forEach(function(latLng) {
              path.push(latLng);
            });
          }
          deferred.resolve();
        });

        return deferred.promise;
      }
    };

    return Route;
  }]);

})(angular, google);

