var mysql = require('mysql');
var views = require('.././routes/views');
var functions = require('.././util/functions');
var vehiculo_model = require('.././models/vehiculo_model');

module.exports = {

    /**
     * REST
     */

    post_registro : function(req, res, next)
    {
        functions.print_console('rest method: post_registro');

        var id_vehiculo = req.body.id_vehiculo;
        var tipo = req.body.tipo;
        var marca = req.body.marca;
        var modelo = req.body.modelo;
        var placa = req.body.placa;
        var fecha_inicio = req.body.fecha_inicio;
        var usuario_registro = req.body.usuario_registro;

        vehiculo_model.registro(id_vehiculo, tipo, marca, modelo, placa, 
                                fecha_inicio, usuario_registro, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg
            };

            res.json(response);
        });
    },

    post_actualiza : function(req, res, next)
    {
        functions.print_console('rest method: post_actualiza');

        var id_vehiculo = req.body.id_vehiculo;
        var tipo = req.body.tipo;
        var marca = req.body.marca;
        var modelo = req.body.modelo;
        var placa = req.body.placa;
        var fecha_inicio = req.body.fecha_inicio;
        var usuario_registro = req.body.usuario_registro;

        vehiculo_model.actualiza(id_vehiculo, tipo, marca, modelo, placa, 
                                fecha_inicio, usuario_registro, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg
            };

            res.json(response);
        });
    },

    post_elimina : function(req, res, next)
    {
        functions.print_console('rest method: post_elimina');

        var id_vehiculo = req.body.id_vehiculo;
        var usuario_registro = req.body.usuario_registro;

        vehiculo_model.elimina(id_vehiculo, usuario_registro, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg
            };

            res.json(response);
        });
    },

};