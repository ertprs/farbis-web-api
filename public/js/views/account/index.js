$(document).ready(function(){

    (function () {

        $("#lnk-ingresar").click(function() {
            validar_usuario();
        });

    })();

    function validar_usuario() {

        var usuario = $('#inp-usuario').val();
        var contrasenia = $('#inp-contrasenia').val();
        var url = "http://localhost:5000/sireis/api/v1/rws_programador_valida";
        var data = { usuario: usuario, contrasenia: contrasenia};

        $.post(url, data)
            .done(function(data) {
                console.log(data.usuario);
                console.log(JSON.stringify(data));

                localStorage.setItem('usuario', JSON.stringify(data.usuario));
                location.href = "http://localhost:5000/programacion/index";
            })
            .fail(function() {
                alert( "error" );
        });
    }

});