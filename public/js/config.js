/**
*
* AngularUI Router to manage routing and views
* Each view are defined as state.
* Initial there are written state for all view in theme.
*
*/
function config($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/login");
  
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/seguridad/login.html',
        data: { pageTitle: 'Login' }
      })
      .state('home', {
        url: '/home',
        templateUrl: 'views/masterpage/main.html',
      })
      .state('home.home', {
        url: "/home",
        templateUrl: "views/programacion/index.html",
        data: { pageTitle: 'Programación - Lista' }
      })
      .state('programacion', {
        abstract: true,
        url: "/programacion",
        templateUrl: "views/masterpage/main.html",
      })
      .state('programacion.lista', {
        url: "/lista",
        templateUrl: "views/programacion/index.html",
        data: { pageTitle: 'Programación - Lista' }
      })
      .state('programacion.mapa', {
        url: "/mapa",
        templateUrl: "views/programacion/mapa.html",
        data: { pageTitle: 'Programación - Mapa' }
      })
      .state('programacion.ficha', {
        url: '/ficha/:id',
        templateUrl: "views/ficha/index.html",
        data: { pageTitle: 'Programación - Ficha Técnica' }
      })
  
  
  }

  angular
    .module('FarbisWebApp')
    .config(config)
    .run(function ($rootScope, $state) {
      $rootScope.$state = $state;
    });