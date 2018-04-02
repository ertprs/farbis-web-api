
angular.module('FarbisWebApp')
.service('ProgramacionService', function($http) {

  var programacionService = {};

  programacionService.listaPorOperario = function(data) {
    return $http({
      method: 'POST', 
      url: '/sireis/api/v1/rws_programacion_lista_por_operario_fecha',
      data: data
    });
  }

  programacionService.obtenerPorId = function(data) {
    return $http({
      method: 'POST', 
      url: '/sireis/api/v1/rws_programacion_obtener_por_id',
      data: data
    });
  }

  return programacionService;
})
.service('FichaService', function($http) {

  var fichaService = {};

  fichaService.obtenerPorPorgramacion = function(data) {
    return $http({
      method: 'POST', 
      url: '/sireis/api/v1/rws_ficha_lista_por_programacion',
      data: data
    });
  }

  return fichaService;
})
.service('UsuarioService', function($http) {

  var usuarioService = {};

  usuarioService.validar = function(data) {
    return $http({
      method: 'POST', 
      url: '/sireis/api/v1/rws_programador_valida',
      data: data
    });
  }

  usuarioService.listaPorTipo = function(data) {
    return $http({
      method: 'POST', 
      url: '/sireis/api/v1/rws_usuario_lista_por_tipo',
      data: data
    });
  }

  return usuarioService;
});
