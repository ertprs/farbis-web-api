
angular.module('FarbisWebApp.controllers')
.controller('ProgramacionController', function($scope, ProgramacionService, UsuarioService) {
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
        //cargarProgramacion();
        cargarOperario();
    };

    $scope.cargarProgramacion = function(){
        cargarProgramacion();
    };

    function cargarProgramacion() {
        var filtro = {
            id_operario: $("#sel-operario").val(),
            fecha : $("#inp-fecha").val()
        };

        ProgramacionService.listaPorOperario(filtro).then(function (response) {
            
            $scope.programacionLista = response.data.programaciones;
        });
    }
    
    function cargarOperario() {
        var filtro = {
            tipo: "1"
        };

        UsuarioService.listaPorTipo(filtro).then(function (response) {
            console.log(response);
            $scope.operarioLista = response.data.usuarios;
        });
    }
    
});