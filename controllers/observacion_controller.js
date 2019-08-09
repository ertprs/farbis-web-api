var mysql = require('mysql');
var views = require('.././routes/views');
var functions = require('.././util/functions');
var observacion_model = require('.././models/observacion_model');

module.exports = {

    /**
     * REST
     */
    post_lista_por_programacion : function(req, res, next)
    {
        functions.print_console('rest method observacion: post_lista_por_programacion');

        var id_programacion = req.body.id_programacion;

        observacion_model.lista_por_operario(id_programacion, function(msg, data){

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

            var response = {
                'ws_code' : '0',
                'mensaje' : msg,
                'item' : item,
                'fecha_hora' : fecha
            };

            res.json(response);
        });
    },

    post_registro_multiple : function(req, res, next)
    {
        functions.print_console('rest method observacion: post_registro_multiple');

        var observaciones = req.body;
        var ids = [];
        var arr_observaciones = [];
        var arr_result = [];

        observaciones.forEach(function(obs, index) {
            var id_programacion = obs.id_programacion;
            var item = obs.item;
            var observacion = obs.observacion;
            var origen = obs.origen;
            var ruta_foto = '';//obs.ruta_foto;
            var ruta_audio = '';//obs.ruta_audio;
            var id_usuario = obs.id_usuario;
            var fecha = new Date();

            //contador += 1;
            arr_observaciones.push([
                id_programacion, item, observacion, origen, ruta_foto, ruta_audio, '1', id_usuario, fecha
            ]);
            //values += "('demian', 'demian@gmail.com', 1,2),"
            //('john', 'john@gmail.com', 2,4)
            /*
            observacion_model.registro(id_programacion, observacion, origen, 
                            ruta_foto, ruta_audio, id_usuario, function(msg, data, item, fecha){

                ids.push({
                    'mensaje' : msg,
                    'item' : item,
                    'fecha_hora' : fecha
                });
                
                if (observaciones.length == index + 1){
                    var response = {
                        'ws_code' : '0',
                        'mensaje' : 'OK',
                        'observaciones' : ids
                    };
            
                    res.json(response);
                }
            });
            */

            arr_result.push({
                "mensaje" : "OK",
                "item" : item,
                "fecha_hora" : fecha
            });
        });

        observacion_model.registro_multiple(arr_observaciones, function(msg, data, item, fecha){

            var response = {
                'ws_code' : '0',
                'mensaje' : 'OK',
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