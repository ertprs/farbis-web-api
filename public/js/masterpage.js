$(document).ready(function(){

    (function () {

        var usuario = $.parseJSON(localStorage.getItem('usuario'));

        $("#div-usuario-nombre").html(usuario.nombre);
        

    })();
});