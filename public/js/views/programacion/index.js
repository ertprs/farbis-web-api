
$(document).ready(function(){

    (function () {

            

    })();

    $('#tab-datos tbody tr td').on('click',function(){
        
        //$("#txtfname").val($(this).closest('tr').children()[0].textContent);
        //$("#txtlname").val($(this).closest('tr').children()[1].textContent);

        var id = $(this).closest('tr').data('id');
        $('#mod-info').modal('show');
    });
});

/*
(function () {
    //Create a Module 
    var app = angular.module('webApp', ['ngRoute']);  // Will use ['ng-Route'] when we will implement routing

    //Create a Controller
    app.controller('PisoController', function ($scope, $http) {  // here $scope is used for share data between view and controller

        $scope.init = function () {
            cargarDatos();
        };

        $scope.accionNuevo = function () {
            $('#inp-id').val('');
            $('#inp-nombre').val('');
            $("#inp-nombre").parent(".fg-line").removeClass("fg-toggled");
            $("#mod-titulo").text('Nuevo Piso');
            $('#mod-registro').modal('show');
        };

        $scope.accionEditar = function (item) {
            $('#inp-id').val(item.id_piso);
            $('#inp-nombre').val(item.nombre);
            $("#inp-nombre").parent(".fg-line").addClass("fg-toggled");
            $("#inp-nombre").focus();
            $("#mod-titulo").text('Editar Piso');
            $('#mod-registro').modal('show');
        };

        $scope.accionEliminar = function (item) {
            var data = JSON.stringify({
                id_usuario: $('#inp-ses_usuario').val(),
                id_sesion: $('#inp-ses_id').val(),
                id_afiliado: $('#inp-ses_afi').val(),
                id_restaurante: $('#inp-ses_rest').val(),
                id_piso: item.id_piso
            });

            $http.post(window.appConfig.api_url + 'rws_piso_eliminar', data, window.appConfig.headers)
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

            $http.post(window.appConfig.api_url + 'rws_piso_listar_por_restaurante', data, window.appConfig.headers)
            .then(function successCallback(response) {
                if (response.data.ws_code == "0" && response.data.mensaje == "OK") {
                    $scope.dataList = angular.copy(response.data.pisos);
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
})();
*/