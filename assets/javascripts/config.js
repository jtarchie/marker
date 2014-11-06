(function(angular) {
  'use strict';

  var app = angular.module('myApp', ['ngRoute']);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'index.html',
        controller: 'MapController'
      });
  }]);
})(angular);
