(function(angular, google, undefined) {
  'use strict';

  var app = angular.module('myApp');

  app.directive('ngActive', function() {
    return {
      restrict: 'A',
      scope: {
        'active': '=ngActive'
      },
      link: function($scope, element, attrs) {
        function setActive(active) {
          if(active) {
            element.addClass('active');
          } else {
            element.removeClass('active');
          }
        }

        $scope.$watch('active', setActive);
        setActive($scope.active);
      }
    };
  });
})(angular, google);
