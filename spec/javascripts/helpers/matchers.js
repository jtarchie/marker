var customMatchers = {
  toBeRoute: function(util, customEqualityTesters) {
    return {
      compare: function(actual) {
        return {
          pass: actual.toString() === '[Object Route]',
          message: 'Expected to be type of Route'
        }
      }
    };
  }
};

beforeEach(function() {
  jasmine.addMatchers(customMatchers);
});
