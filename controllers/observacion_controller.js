var mysql = require('mysql');
var views = require('.././routes/views');
var functions = require('.././util/functions');
var observacion_model = require('.././models/observacion_model');
var usuario_model = require('.././models/usuario_model');

module.exports = {

    /**
     * REST
     */
    post_lista_por_programacion : function(req, res, next)
    {
        functions.print_console('rest method observacion: post_lista_por_programacion');

        var id_programacion = req.body.id_programacion;
        var connection = require('.././database/connection');
        var pool = connection.get_pool();

        observacion_model.lista_por_programacion(id_programacion, pool, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg, 
                'observaciones' : data
            };

            res.json(response);
        });
    },

    post_registro : function(req, res, next)
    {
        functions.print_console('rest method observacion: post_registro');

        var id_programacion = req.body.id_programacion;
        var observacion = req.body.observacion;
        var origen = req.body.origen;
        var ruta_foto = req.body.ruta_foto;
        var ruta_audio = req.body.ruta_audio;
        var id_usuario = req.body.id_usuario;

        observacion_model.registro(id_programacion, observacion, origen, 
                        ruta_foto, ruta_audio, id_usuario, function(msg, data, item, fecha){

            var notificacion = '';

            if (msg == 'OK' && origen == 'P') { //Registro por programador
                // Buscamos al personal asignado al servicio y obtenemos los tokens
                usuario_model.lista_token_por_programacion(id_programacion, function(msg_token, data){

                    if (data == null) {
                        var response = {
                            'ws_code' : '0',
                            'mensaje' : msg,
                            'notificacion' : 'No existen tokens',
                            'item' : item,
                            'fecha_hora' : fecha
                        };

                        res.json(response);
                    } else {
                        // formatear los tokens
                        var tokens = [];
                        data.forEach(usuario => {
                            tokens.push(usuario.token);
                        });

                        functions.send_push_notification_list(tokens, 'Nueva indicación', observacion, function(msg_push) {

                            var response = {
                                'ws_code' : '0',
                                'mensaje' : msg,
                                'notificacion' : msg_push,
                                'item' : item,
                                'fecha_hora' : fecha
                            };
    
                            res.json(response);
                        });
                    }                    
                });
            } else {
                var response = {
                    'ws_code' : '0',
                    'mensaje' : msg,
                    'notificacion' : notificacion,
                    'item' : item,
                    'fecha_hora' : fecha
                };
    
                res.json(response);   
            }
        });
    },

    post_registro_multiple : function(req, res, next)
    {
        functions.print_console('rest method observacion: post_registro_multiple');

        var observaciones = req.body;
        var arr_observaciones = [];
        var arr_result = [];

        observaciones.forEach(function(obs, index) {
            var id_programacion = obs.id_programacion;
            var item = obs.item;
            var observacion = obs.observacion;
            var origen = obs.origen;
            var ruta_foto = '';
            var ruta_audio = '';
            var id_usuario = obs.id_usuario;
            var fecha = new Date();

            arr_observaciones.push([
                id_programacion, item, observacion, origen, ruta_foto, ruta_audio, '1', id_usuario, fecha
            ]);

            arr_result.push({
                "mensaje" : "OK",
                "item" : item,
                "fecha_hora" : fecha
            });
        });

        observacion_model.registro_multiple(arr_observaciones, function(msg, data, item, fecha){
            console.log('obs registro_multiple: ' + msg);
            var response = {
                'ws_code' : '0',
                'mensaje' : msg,
                'observaciones' : arr_result
            };
    
            res.json(response);
        });
    },

    post_actualiza : function(req, res, next)
    {
        functions.print_console('rest method observacion: post_actualiza');

        var id_programacion = req.body.id_programacion;
        var item = req.body.item;
        var observacion = req.body.observacion;
        var ruta_foto = req.body.ruta_foto;
        var ruta_audio = req.body.ruta_audio;
        var id_usuario = req.body.id_usuario;

        observacion_model.actualiza(id_programacion, item, observacion,  
                        ruta_foto, ruta_audio, id_usuario, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg
            };

            res.json(response);
        });
    },

    post_elimina : function(req, res, next)
    {
        functions.print_console('rest method observacion: post_elimina');

        var id_programacion = req.body.id_programacion;
        var item = req.body.item;
        var id_usuario = req.body.id_usuario;

        observacion_model.elimina(id_programacion, item, id_usuario, 
                                            function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg
            };

            res.json(response);
        });
    }
    
};