var yourstoryApp = angular.module('yourstory', ['ngRoute', 'yourstoryControllers', 'yourstoryFilters', 'yourstoryServices', 'yourstoryAnimations']);

yourstoryApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/people', {
        templateUrl: 'partials/people-list.html',
        controller: 'PeopleListCtrl'
      }).
      when('/people/:personId', {
        templateUrl: 'partials/people-detail.html',
        controller: 'PeopleDetailCtrl'
      }).
      otherwise({
        redirectTo: '/people'
      });
  }]);