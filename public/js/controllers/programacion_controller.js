/*
    //Create a Controller
    angular.module('webApp', [])
    .controller('ProgramacionController', function ($scope, $http) {  // here $scope is used for share data between view and controller

        $scope.init = function () {
            console.log('init');
            cargarDatos();
        };

        $scope.accionNuevo = function () {
            $('#inp-id').val('');
            $('#inp-id_cliente').val('');
            $('#inp-nombre_cliente').val('');
            $('#inp-hora').val('');
            $('#inp-nro_personas').val('');
            $('#inp-comentarios').val('');
            $("#inp-nombre_cliente").parent(".fg-line").removeClass("fg-toggled");
            $("#inp-hora").parent(".fg-line").removeClass("fg-toggled");
            $("#inp-nro_personas").parent(".fg-line").removeClass("fg-toggled");
            $("#inp-comentarios").parent(".fg-line").removeClass("fg-toggled");
            $("#mod-titulo").text('Nueva Lista de Espera');
            $('#mod-registro').modal('show');
        };

        $scope.accionEditar = function (item) {
            $('#inp-id').val(item.id_reserva);
            $('#inp-id_cliente').val(item.id_cliente);
            $('#inp-nombre_cliente').val(item.nombre_cliente);
            $('#inp-hora').val(item.hora);
            $('#inp-nro_personas').val(item.nro_personas);
            $('#inp-comentarios').val(item.comentarios);
            $("#inp-nombre_cliente").parent(".fg-line").addClass("fg-toggled");
            $("#inp-hora").parent(".fg-line").addClass("fg-toggled");
            $("#inp-nro_personas").parent(".fg-line").addClass("fg-toggled");
            $("#inp-comentarios").parent(".fg-line").addClass("fg-toggled");
            $("#inp-nombre").focus();
            $("#mod-titulo").text('Editar Lista de Espera');
            $('#mod-registro').modal('show');
        };

        $scope.accionEliminar = function (item) {
            var data = JSON.stringify({
                id_usuario: $('#inp-ses_usuario').val(),
                id_sesion: $('#inp-ses_id').val(),
                id_afiliado: $('#inp-ses_afi').val(),
                id_restaurante: $('#inp-ses_rest').val(),
                id_reserva: item.id_reserva
            });

            $http.post(window.appConfig.api_url + 'rws_reserva_eliminar', data, window.appConfig.headers)
            .then(function successCallback(response) {
                if (response.data.ws_code == "0" && response.data.mensaje == "OK") {
                    cargarDatos();
                }
            }, function errorCallback(response) {
            });
        };

        function cargarDatos () {
            
            var data = JSON.stringify({
                id_usuario: $('#inp-ses_usuario').val(),
                id_sesion: $('#inp-ses_id').val(),
                id_afiliado: $('#inp-ses_afi').val(),
                id_restaurante: $('#inp-ses_rest').val()
            });

            $http.post(window.appConfig.api_url + 'rws_reserva_listar_para_hoy', data, window.appConfig.headers)
            .then(function successCallback(response) {
                if (response.data.ws_code == "0" && response.data.mensaje == "OK") {
                    $scope.dataList = angular.copy(response.data.reservas);
                }
            }, function errorCallback(response) {
            });
        };

        $scope.guardarDatos = function () {
            
            var data = JSON.stringify({
                id_usuario: $('#inp-ses_usuario').val(),
                id_sesion: $('#inp-ses_id').val(),
                id_afiliado: $('#inp-ses_afi').val(),
                id_restaurante: $('#inp-ses_rest').val(),
                id_piso: $('#inp-id').val(),
                nombre: $('#inp-nombre').val()
            });

            if ($('#inp-id').val() == "") {
                $http.post(window.appConfig.api_url + 'rws_piso_registrar', data, window.appConfig.headers)
                .then(function successCallback(response) {
                    if (response.data.ws_code == "0" && response.data.mensaje == "OK") {
                        cargarDatos();
                        $('#mod-registro').modal('hide');
                    }
                }, function errorCallback(response) {
                });
            } else {
                $http.post(window.appConfig.api_url + 'rws_piso_actualizar', data, window.appConfig.headers)
                .then(function successCallback(response) {
                    if (response.data.ws_code == "0" && response.data.mensaje == "OK") {
                        cargarDatos();
                        $('#mod-registro').modal('hide');
                    }
                }, function errorCallback(response) {
                });
            }

        };

    });
*/

angular.module('FarbisWebApp.controllers', []).
  controller('ProgramacionController', function($scope, ProgramacionService) {
    $scope.programacionFiltro = null;
    $scope.programacionLista = [];
    $scope.operario = {
        'id_operario' : 'OP0001'
    };

    $scope.init = function () {
    console.log('init');
    //cargarDatos();
  };

    ProgramacionService.listaPorOperario($scope.operario).then(function (response) {
        $scope.programacionLista = response.data.programaciones;
    });

});