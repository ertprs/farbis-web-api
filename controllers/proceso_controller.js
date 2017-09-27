var mysql = require('mysql');
var views = require('.././routes/views');
var functions = require('.././util/functions');
var proceso_model = require('.././models/proceso_model');

module.exports = {

    /**
     * REST
     */

    post_lista_por_programacion : function(req, res, next)
    {
        functions.print_console('rest method proceso: post_lista_por_programacion');

        var id_programacion = req.body.id_programacion;
        var tipo = req.body.tipo;

        proceso_model.lista_por_programacion(id_programacion, tipo, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg, 
                'procesos' : data
            };

            res.json(response);
        });
    },

    post_registro : function(req, res, next)
    {
        functions.print_console('rest method proceso: post_registro');

        var id_programacion = req.body.id_programacion;
        var tipo = req.body.tipo;
        var descripcion = req.body.descripcion;
        var nombre = req.body.nombre;
        var telefono = req.body.telefono;
        var area = req.body.area;
        var fecha_vcto = req.body.fecha_vcto;
        var ruta_foto = req.body.ruta_foto;
        var ruta_audio = req.body.ruta_audio;
        var ruta_video = req.body.ruta_video;
        var id_usuario = req.body.id_usuario;

        if (fecha_vcto == '') {
            fecha_vcto = null;
        }
        else{
            fecha_vcto = functions.string_todate(fecha_vcto, 'dd/MM/yyyy', '/');
        }

        proceso_model.registro(id_programacion, tipo, descripcion, nombre, telefono, area, 
                        fecha_vcto, ruta_foto, ruta_audio, ruta_video, id_usuario, function(msg, data, item, fecha){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg,
                'item' : item,
                'fecha_hora' : fecha
            };

            res.json(response);
        });
    },

    post_actualiza : function(req, res, next)
    {
        functions.print_console('rest method proceso: post_actualiza');

        var id_programacion = req.body.id_programacion;
        var tipo = req.body.tipo;
        var item = req.body.item;
        var descripcion = req.body.descripcion;
        var nombre = req.body.nombre;
        var telefono = req.body.telefono;
        var area = req.body.area;
        var fecha_vcto = req.body.fecha_vcto;
        var ruta_foto = req.body.ruta_foto;
        var ruta_audio = req.body.ruta_audio;
        var ruta_video = req.body.ruta_video;
        var id_usuario = req.body.id_usuario;

        if (fecha_vcto == '') {
            fecha_vcto = null;
        }
        else{
            fecha_vcto = functions.string_todate(fecha_vcto, 'dd/MM/yyyy', '/');
        }

        proceso_model.actualiza(id_programacion, tipo, item, descripcion, nombre, telefono, area, 
                        fecha_vcto, ruta_foto, ruta_audio, ruta_video, id_usuario, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg
            };

            res.json(response);
        });
    },

    post_confirma : function(req, res, next)
    {
        functions.print_console('rest method proceso: post_confirma');

        var id_programacion = req.body.id_programacion;
        var tipo = req.body.tipo;
        var item = req.body.item;
        var id_usuario = req.body.id_usuario;

        proceso_model.confirma(id_programacion, tipo, item, id_usuario, 
                                            function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg
            };

            res.json(response);
        });
    },

    post_elimina : function(req, res, next)
    {
        functions.print_console('rest method proceso: post_elimina');

        var id_programacion = req.body.id_programacion;
        var tipo = req.body.tipo;
        var item = req.body.item;
        var id_usuario = req.body.id_usuario;

        proceso_model.elimina(id_programacion, tipo, item, id_usuario, 
                                            function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg
            };

            res.json(response);
        });
    },

    post_lista_pendientes : function(req, res, next)
    {
        functions.print_console('rest method proceso: post_lista_pendientes');

        var id_programacion = req.body.id_programacion;

        proceso_model.lista_pendientes(id_programacion, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg, 
                'procesos' : data
            };

            res.json(response);
        });
    },

    
};