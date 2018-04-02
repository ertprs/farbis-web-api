
angular.module('FarbisWebApp.services')
.factory('UsuarioService', function($http) {

  var usuarioService = {};

  usuarioService.listaPorTipo = function(data) {
    return $http({
      method: 'POST', 
      url: '/sireis/api/v1/rws_usuario_lista_por_tipo',
      data: data
    });
  }

  return usuarioService;
});
