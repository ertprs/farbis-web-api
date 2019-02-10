var mysql = require('mysql');
var views = require('.././routes/views');
var functions = require('.././util/functions');
var vehiculo_observacion_model = require('.././models/vehiculo_observacion_model');

module.exports = {

    /**
     * REST
     */

    post_registro : function(req, res, next)
    {
        functions.print_console('rest method vehiculo_observacion: post_registro');

        var id_vehiculo_movimiento = req.body.id_vehiculo_movimiento;
        var id_vehiculo = req.body.id_vehiculo;
        var personal = req.body.personal;
        var item = req.body.item;
        var comentario = req.body.comentario;
        var ruta_foto = req.body.ruta_foto;
        var ruta_audio = req.body.ruta_audio;
        var ruta_video = req.body.ruta_video;
        var id_usuario = req.body.id_usuario;

        console.log('paso 1'); 
        vehiculo_observacion_model.registro(id_vehiculo_movimiento, id_vehiculo, personal, item, comentario, 
            ruta_foto, ruta_audio, ruta_video, id_usuario, function(msg, data, id, fecha){
                console.log('paso 2');
            var response = {
                'ws_code' : '0',
                'mensaje' : msg,
                'id_vehiculo_observacion' : id,
                'fecha_hora' : fecha
            };

            res.json(response);
        });
    },

    post_actualiza : function(req, res, next)
    {
        functions.print_console('rest method vehiculo_observacion: post_actualiza');

        var id_vehiculo_observacion = req.body.id_vehiculo_observacion;
        var id_vehiculo_movimiento = req.body.id_vehiculo_movimiento;
        var id_vehiculo = req.body.id_vehiculo;
        var personal = req.body.personal;
        var item = req.body.item;
        var comentario = req.body.comentario;
        var ruta_foto = req.body.ruta_foto;
        var ruta_audio = req.body.ruta_audio;
        var ruta_video = req.body.ruta_video;
        var id_usuario = req.body.id_usuario;

        vehiculo_observacion_model.actualiza(id_vehiculo_observacion, id_vehiculo_movimiento, id_vehiculo, personal, item, comentario, 
            ruta_foto, ruta_audio, ruta_video, id_usuario, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg
            };

            res.json(response);
        });
    },

    post_elimina : function(req, res, next)
    {
        functions.print_console('rest method vehiculo_observacion: post_elimina');

        var id_vehiculo_observacion = req.body.id_vehiculo_observacion;
        var id_usuario = req.body.id_usuario;

        vehiculo_observacion_model.elimina(id_vehiculo_observacion, id_usuario, 
                                            function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg
            };

            res.json(response);
        });
    },

};