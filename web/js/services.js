var yourstoryServices = angular.module('yourstoryServices', ['ngResource']);

yourstoryServices.factory('Person', ['$resource',
  function($resource){
    return $resource('/data/people/:personId', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  }]);