(function () {
    //Create a Module 
    //var app = angular.module('webRestApp', ['ngRoute']);  // Will use ['ng-Route'] when we will implement routing

    //Create a Controller
    angular.module('webApp').controller('NavigationController', function ($scope, $location) {  // here $scope is used for share data between view and controller

        $scope.getClass = function (path) {
            return $location.absUrl().indexOf(path) != -1 ? 'active' : '';
        };

        $scope.getSubClass = function (path) {
            return $location.absUrl().indexOf(path) != -1 ? 'active toggled' : '';
        };

    });
})();