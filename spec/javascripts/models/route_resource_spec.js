describe('RouteResource', function() {
  'use strict';

  beforeEach(function() {
    module('myApp');
  });

  describe('initialization', function() {
    var resource, httpBackend;

    beforeEach(inject(function(RouteResource, $httpBackend) {
      resource = RouteResource;
      httpBackend = $httpBackend;
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    describe('loading a route', function() {
      it('returns a promise that gets called with a new route', function() {
        httpBackend.expectGET('/routes/1234').respond({features: []});
        var promise = resource.load(1234),
            callback = jasmine.createSpy();
        promise.then(callback);
        httpBackend.flush();
        expect(callback).toHaveBeenCalled();

        var route = callback.calls.first().args[0];
        expect(route).toBeRoute();
      });
    });

    describe('saving a route', function() {
      describe('that has not been persisted yet', function() {
        var route;

        beforeEach(function() {
          route = createRoute();
        });

        it('returns a promise that gets called with a new route', function() {
          httpBackend.expectPOST('/routes', {}).respond({features: []});
          var route = createRoute(),
              promise = resource.save(route),
              callback = jasmine.createSpy();
          promise.then(callback);
          httpBackend.flush();
          expect(callback).toHaveBeenCalled();
        });
      });
    });
  });
});
