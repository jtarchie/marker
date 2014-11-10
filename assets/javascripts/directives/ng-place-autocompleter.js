(function(angular, google, document, undefined) {
  'use strict';

  var app = angular.module('myApp');

  app.directive('ngPlaceAutocompleter', function() {
    return {
      restrict: 'E',
      link: function link($scope, container, attrs) {
        var input = document.createElement('INPUT');
        input.classList.add('form-control');
        container.prepend(input);

        var autocompleter = new google.maps.places.Autocomplete(input);
        google.maps.event.addListener(autocompleter, 'place_changed', function() {
          var place = autocompleter.getPlace();
          if (place.geometry) {
            $scope.$broadcast('places:changed', place);
          }
        });
        $scope.autocompleter = autocompleter;
      }
    };
  });
})(angular, google, document);
