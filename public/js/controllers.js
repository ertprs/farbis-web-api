
angular.module('FarbisWebApp')
.controller('UsuarioController', function($scope, $location, ProgramacionService, UsuarioService) {

    $scope.usuarioLista = [];
    $scope.filtro = {
        tipo: "O"
    }
    
    $scope.validacion = {
        error: false,
        mensaje: ""
    }
    
    $scope.init = function () {
        console.log('init');
    };

    $scope.validarUsuario = function () {
        console.log('validarUsuario');
        validarUsuario();
    };

    function validarUsuario() {
        if ($scope.loginForm.$valid) {
            var params = {
                usuario: $("#inp-usuario").val(),
                contrasenia : $("#inp-contrasenia").val()
            };
            
            $(".page-loader").show();
            UsuarioService.validar(params).then(function (response) {
                
                $(".page-loader").fadeOut();
                if (response.data.ws_code == "0" && response.data.mensaje == "OK") {
                    localStorage.setItem('userData', JSON.stringify(response.data.usuario));
                    //$location.path("/home/home");
                    $location.path("/programacion/lista");
                } else {
                    
                    $scope.validacion = {
                        error: true,
                        mensaje: response.data.mensaje
                    }
                }
            });
        } else {
            $scope.loginForm.submitted = true;
            return;
        }

    }
})
.controller('ProgramacionController', function($scope, $state, $uibModal, $timeout, ProgramacionService, FichaService, UsuarioService) {
    $scope.programacionFiltro = null;
    $scope.programacionLista = [];
    $scope.operarioLista = [];
    $scope.filtro = {
        id_operario: "",
        fecha : new Date().toLocaleDateString("es-PE")
    }
    //console.log($scope.filtro.fecha);
    //$scope.filtro_fecha = new Date().toLocaleDateString("es-PE");
    //$scope.filtro_operario = "";
    
    $(".date-picker").datetimepicker({
        format: 'DD/MM/YYYY'
    })
    .datetimepicker('setDate', $scope.filtro.fecha);

    $scope.init = function () {
        console.log('init');
        $('body').addClass('sw-toggled');
        //cargarProgramacion();
        cargarOperario();
    };

    $scope.cargarProgramacion = function(){
        cargarProgramacion();
    };

    $scope.verDetalle = function(programacion) {
        $scope.programacion = angular.copy(programacion);
        $scope.programacion.index = $scope.programacionLista.indexOf(programacion);
        verDetalle();
    };

    $scope.verFicha = function(programacion) {
        $scope.programacion = angular.copy(programacion);
        //$state.go("programacion.ficha", { id: $scope.programacion.id_programacion });
        verFicha();
    };

    function cargarProgramacion() {
        var filtro = {
            id_operario: $("#sel-operario").val(),
            fecha : $("#inp-fecha").val()
        };

        $(".page-loader").show();
        ProgramacionService.listaPorOperario(filtro).then(function (response) {
            
            $scope.programacionLista = response.data.programaciones;
            $(".page-loader").fadeOut();
        });
    }
    
    function cargarOperario() {
        var filtro = {
            tipo: "1"
        };

        $(".page-loader").show();
        UsuarioService.listaPorTipo(filtro).then(function (response) {
            $scope.operarioLista = response.data.usuarios;
            
            $(".page-loader").fadeOut();

            $timeout(function() {
                $('.selectpicker').selectpicker('refresh');
                $('.selectpicker').selectpicker('render');
            });
        });
    }

    function verDetalle() {
        var filtro = {
            id_programacion: $scope.programacion.id_programacion
        };

        $(".page-loader").show();
        FichaService.obtenerPorPorgramacion(filtro).then(function (response) {
            
            $(".page-loader").fadeOut();

            if (response.data.ws_code == "0" && response.data.mensaje == "OK") {
                $scope.ficha = response.data.ficha;
                abrirDetalleModal();
            }
        });
    }

    function verFicha() {
        var filtro = {
            id_programacion: $scope.programacion.id_programacion
        };

        $(".page-loader").show();
        FichaService.obtenerPorPorgramacion(filtro).then(function (response) {
            
            $(".page-loader").fadeOut();

            if (response.data.ws_code == "0" && response.data.mensaje == "OK") {
                $scope.ficha = response.data.ficha;
                abrirFichaModal();
            }
        });
    }

    function abrirDetalleModal() {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/programacion/modal-detalle.html',
            controller: 'FichaController',
            scope: $scope
        }).result.finally(function() {

        });
    }

    function abrirFichaModal() {
        var modalInstance = $uibModal.open({
            templateUrl: 'views/programacion/modal-ficha.html',
            controller: 'FichaController',
            size: "lg",
            scope: $scope
        }).result.finally(function() {

        });
    }
    
})
.controller('FichaController', function($scope, $rootScope, $window, $stateParams, ProgramacionService, FichaService) {

    $scope.id_programacion = $stateParams.id;
    console.log($scope.id_programacion);

    $scope.init = function () {
        console.log('init');
        cargarProgramacion();
    };

    function cargarProgramacion() {
        var params = {
            id_programacion: $scope.id_programacion
        };

        $(".page-loader").show();
        ProgramacionService.obtenerPorId(params).then(function (response) {
            
            $(".page-loader").fadeOut();

            if (response.data.ws_code == "0" && response.data.mensaje == "OK") {
                $scope.programacion = response.data.programacion;
                console.log($scope.programacion);
                cargarFicha();
            }
        });
    }

    function cargarFicha() {
        var params = {
            id_programacion: $scope.id_programacion
        };

        $(".page-loader").show();
        FichaService.obtenerPorPorgramacion(params).then(function (response) {
            
            $(".page-loader").fadeOut();

            if (response.data.ws_code == "0" && response.data.mensaje == "OK") {
                $scope.ficha = response.data.ficha;
                console.log($scope.ficha);
            }
        });
    }
})
.controller('NavigationController', function($scope, $rootScope, $window) {

    var user = JSON.parse($window.localStorage.getItem('userData'));
    $rootScope.currentUsuario = user ? user : [];
});