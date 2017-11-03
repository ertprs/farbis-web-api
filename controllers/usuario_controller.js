var mysql = require('mysql');
var views = require('.././routes/views');
var functions = require('.././util/functions');
var usuario_model = require('.././models/usuario_model');

module.exports = {

    /**
     * REST
     */

    post_registro : function(req, res, next)
    {
        functions.print_console('rest method: post_registro');

        var id_usuario = req.body.id_usuario;
        var nombres = req.body.nombres;
        var usuario = req.body.usuario;
        var contrasenia = req.body.contrasenia;
        var tipo_usuario = req.body.tipo_usuario;
        var color = req.body.color;
        var id_area = req.body.id_area;
        var usuario_registro = req.body.usuario_registro;

        usuario_model.registro(id_usuario, nombres, usuario, contrasenia, 
                                tipo_usuario, color, id_area, usuario_registro, function(msg, data){

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

        var id_usuario = req.body.id_usuario;
        var nombres = req.body.nombres;
        var usuario = req.body.usuario;
        var contrasenia = req.body.contrasenia;
        var tipo_usuario = req.body.tipo_usuario;
        var color = req.body.color;
        var id_area = req.body.id_area;
        var usuario_registro = req.body.usuario_registro;

        usuario_model.actualiza(id_usuario, nombres, usuario, contrasenia, 
                                tipo_usuario, color, id_area, usuario_registro, function(msg, data){

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

        var id_usuario = req.body.id_usuario;

        usuario_model.elimina(id_usuario, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg
            };

            res.json(response);
        });
    },

    post_validar_operario : function(req, res, next)
    {
        functions.print_console('rest method: post_validar_operario');

        var usuario = req.body.usuario;
        var contrasenia = req.body.contrasenia;
        var tipo = 'O';

        usuario_model.valida(usuario, tipo, function(msg, data){

            if (data) {
                if (data.contrasenia != contrasenia) {
                    data = {};
                    msg = 'La contraseña es incorrecta.';
                }
            }else{
                data = {};
                msg = 'El usuario no existe.';
            }

            var response = {
                'ws_code' : '0',
                'mensaje' : msg, 
                'usuario' : data
            };

            res.json(response);
        });
    },

    post_actualiza_token : function(req, res, next)
    {
        functions.print_console('rest method: post_actualiza_token');

        var id_usuario = req.body.id_usuario;
        var token = req.body.token;

        usuario_model.actualiza_token(id_usuario, token, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg
            };

            res.json(response);
        });
    },


    post_validar_programador : function(req, res, next)
    {
        functions.print_console('rest method: post_validar_programador');

        var usuario = req.body.usuario;
        var contrasenia = req.body.contrasenia;
        var tipo = 'P';

        usuario_model.valida(usuario, tipo, function(msg, data){

            if (data) {
                if (data.contrasenia != contrasenia) {
                    data = {};
                    msg = 'La contraseña es incorrecta.';
                }
            }else{
                data = {};
                msg = 'El usuario no existe.';
            }

            var response = {
                'ws_code' : '0',
                'mensaje' : msg, 
                'usuario' : data
            };

            res.json(response);
        });
    },

};