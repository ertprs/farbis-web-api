var mysql = require('mysql');
var views = require('.././routes/views');
var functions = require('.././util/functions');
var proceso_archivo_model = require('.././models/proceso_archivo_model');

module.exports = {

    /**
     * REST
     */

    post_registro : function(req, res, next)
    {
        functions.print_console('rest method proceso_archivo: post_registro');

        var id_programacion = req.body.id_programacion;
        var tipo = req.body.tipo;
        var descripcion = req.body.descripcion;
        var ruta_foto = req.body.ruta_foto;
        var ruta_audio = req.body.ruta_audio;
        var ruta_video = req.body.ruta_video;
        var id_usuario = req.body.id_usuario;

        proceso_archivo_model.registro(id_programacion, tipo, descripcion, 
            ruta_foto, ruta_audio, ruta_video, id_usuario, function(msg, data, id, fecha){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg,
                'id_proceso_archivo' : id,
                'fecha_hora' : fecha
            };

            res.json(response);
        });
    },

    post_actualiza : function(req, res, next)
    {
        functions.print_console('rest method proceso_archivo: post_actualiza');

        var id_proceso_archivo = req.body.id_proceso_archivo;
        var ruta_foto = req.body.ruta_foto;
        var ruta_audio = req.body.ruta_audio;
        var ruta_video = req.body.ruta_video;

        proceso_archivo_model.actualiza(id_proceso_archivo, ruta_foto, ruta_audio, ruta_video, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg
            };

            res.json(response);
        });
    },

    post_elimina : function(req, res, next)
    {
        functions.print_console('rest method proceso_archivo: post_elimina');

        var id_proceso_archivo = req.body.id_proceso_archivo;
        var id_usuario = req.body.id_usuario;

        proceso_archivo_model.elimina(id_proceso_archivo, id_usuario, 
                                            function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg
            };

            res.json(response);
        });
    },

};