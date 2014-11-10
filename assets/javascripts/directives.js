(function(angular, google, document, undefined) {
  'use strict';

  var app = angular.module('myApp');

  app.directive('ngGoogleMap', function() {
    return {
      restrict: 'E',
      link: function link($scope, container, attrs) {
        var element = document.createElement('DIV');
        element.style.width = '100%';
        element.style.height= '100%';
        container.prepend(element);

        var map = new google.maps.Map(element, {
          center: { lat: -34.397, lng: 150.644},
          zoom: 8,
          panControl: false,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
          },
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          overviewMapControl: false
        });

        google.maps.event.addListener(map, 'click', function(event) {
          $scope.$broadcast('map:click', event.latLng);
        });

        $scope.map = map;
      }
    };
  });

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
})(angular, google, document);
