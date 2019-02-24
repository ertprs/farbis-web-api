var mysql = require('mysql');
var views = require('.././routes/views');
var functions = require('.././util/functions');
var vehiculo_movimiento_model = require('.././models/vehiculo_movimiento_model');

module.exports = {

    /**
     * REST
     */

    post_registro : function(req, res, next)
    {
        functions.print_console('rest method vehiculo movimiento: post_registro');

        var id_vehiculo = req.body.id_vehiculo;
        var tipo = req.body.tipo;
        var personal = req.body.personal;
        var fecha = req.body.fecha;
        var ruta_foto = req.body.ruta_foto;
        var geo_latitud = req.body.geo_latitud;
        var geo_longitud = req.body.geo_longitud;
        var usuario_registro = req.body.usuario_registro;

        if (fecha == '') {
            fecha = null;
        }
        else{
            fecha = functions.string_todatetime(fecha, 'MM/dd/yyyy', '/');
        }

        vehiculo_movimiento_model.registro(id_vehiculo, tipo, personal, fecha, ruta_foto, 
            geo_latitud, geo_longitud, usuario_registro, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg
            };

            res.json(response);
        });
    },

    post_actualiza : function(req, res, next)
    {
        functions.print_console('rest method vehiculo movimiento: post_actualiza');

        var id_vehiculo_movimiento = req.body.id_vehiculo_movimiento;
        var id_vehiculo = req.body.id_vehiculo;
        var tipo = req.body.tipo;
        var personal = req.body.personal;
        var fecha = req.body.fecha;
        var ruta_foto = req.body.ruta_foto;
        var geo_latitud = req.body.geo_latitud;
        var geo_longitud = req.body.geo_longitud;
        var usuario_registro = req.body.usuario_registro;

        if (fecha == '') {
            fecha = null;
        }
        else{
            fecha = functions.string_todatetime(fecha, 'MM/dd/yyyy', '/');
        }
        
        vehiculo_movimiento_model.actualiza(id_vehiculo_movimiento, id_vehiculo, tipo, personal, fecha, ruta_foto, 
            geo_latitud, geo_longitud, usuario_registro, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg
            };

            res.json(response);
        });
    },

    post_elimina : function(req, res, next)
    {
        functions.print_console('rest method vehiculo movimiento: post_elimina');

        var id_vehiculo_movimiento = req.body.id_vehiculo_movimiento;
        var usuario_registro = req.body.usuario_registro;

        vehiculo_movimiento_model.elimina(id_vehiculo_movimiento, usuario_registro, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg
            };

            res.json(response);
        });
    },

    post_lista_por_usuario : function(req, res, next)
    {
        functions.print_console('rest method vehiculo movimiento: post_lista_por_usuario');

        var personal = req.body.personal;

        vehiculo_movimiento_model.lista_por_usuario(personal, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg, 
                'movimientos' : data
            };

            res.json(response);
        });
    },

};