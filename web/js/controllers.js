var yourstoryControllers = angular.module('yourstoryControllers', []);

// Add new service $http
yourstoryControllers.controller('PeopleListCtrl', ['$scope', 'Person', function($scope, Person) {

    $scope.people = Person.query();

    // Hello AngularJS message
    $scope.message = "";

    // Initialize empty user array
    //    $scope.users = [{name: "Darwin", age: 3}, {name: "Hugo", age: 1},
    //        {name: "Kelly", age: 31}, {name: "Jonathan", age: 41}];

    $scope.orderProp = 'age';
}]);

yourstoryControllers.controller('PeopleDetailCtrl', ['$scope', '$routeParams', 'Person', function($scope, $routeParams, Person) {

    $scope.person = Person.get({personId: $routeParams.personId});

}]);