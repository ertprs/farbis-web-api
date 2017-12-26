
  angular.module('FarbisWebApp', [
    'FarbisWebApp.services',
    'FarbisWebApp.controllers',
    'ngRoute'
  ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when("/programacion/index", {templateUrl: "programacion/index2.ejs", controller: "ProgramacionController"}).
      when("/drivers/:id", {templateUrl: "partials/driver.html", controller: "driverController"}).
      otherwise({redirectTo: '/drivers'});
  }]);
  