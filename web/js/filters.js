var yourstoryFilters = angular.module('yourstoryFilters', [])

yourstoryFilters.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});