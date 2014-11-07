(function(angular) {
  'use strict';

  var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'index.html',
        controller: 'MapController'
      });
  }]);
})(angular);
