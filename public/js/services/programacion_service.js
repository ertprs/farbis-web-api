
angular.module('FarbisWebApp.services', []).
factory('ProgramacionService', function($http) {

  var programacionService = {};

  programacionService.listaPorOperario = function(data) {
    return $http({
      method: 'POST', 
      url: '/sireis/api/v1/rws_programacion_lista_por_operario',
      data: data
    });
  }

  return programacionService;
});
