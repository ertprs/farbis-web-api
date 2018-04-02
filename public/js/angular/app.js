/*  
 angular.module('FarbisWebApp', [
    'ngRoute',
  ]).
  config(['$routeProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "views/seguridad/login.html",
        controller: "UsuarioController",
        title: "Login"
      })
      .when("/login", {
        templateUrl: "views/seguridad/login.html",
        controller: "UsuarioController",
        title: "Login"
      })
      .when("/programacion/index", {
        templateUrl: "views/programacion/index.html", 
        controller: "ProgramacionController",
        title: "Programaciones"
      }).
      //when("/drivers/:id", {templateUrl: "partials/driver.html", controller: "driverController"}).
      otherwise({redirectTo: '/'});

      
  }]);
 */

angular.module('FarbisWebApp', [
  'ui.router',
  'ui.bootstrap'
]);



