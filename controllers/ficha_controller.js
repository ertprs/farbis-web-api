var mysql = require('mysql');
var views = require('.././routes/views');
var functions = require('.././util/functions');
var ficha_model = require('.././models/ficha_model');

module.exports = {

    /**
     * REST
     */

    post_registro : function(req, res, next)
    {
        functions.print_console('rest method ficha: post_registro');

        var id_programacion = req.body.id_programacion;
        var numero = req.body.numero;
        var fecha_llegada = req.body.fecha_llegada;
        var foto_llegada = req.body.foto_llegada;
        var fecha_inicio = req.body.fecha_inicio; 
        var foto_inicio = req.body.foto_inicio; 
        var fecha_fin = req.body.fecha_fin; 
        var fecha_salida = req.body.fecha_salida; 
        var diagnostico_codigo = req.body.diagnostico_codigo;
        var diagnostico_nombre = req.body.diagnostico_nombre; 
        var diagnostico_foto = req.body.diagnostico_foto; 
        var condicion_sanitaria_codigo = req.body.condicion_sanitaria_codigo; 
        var condicion_sanitaria_nombre = req.body.condicion_sanitaria_nombre; 
        var trabajo_realizado_codigo = req.body.trabajo_realizado_codigo; 
        var trabajo_realizado_nombre = req.body.trabajo_realizado_nombre;
        var ficha_fisica_foto = req.body.ficha_fisica_foto; 
        var flg_envio_foto = req.body.flg_envio_foto; 
        var flg_envio_audio = req.body.flg_envio_audio; 
        var flg_envio_video = req.body.flg_envio_video;
        var es_descargado = req.body.es_descargado; 
        var id_usuario = req.body.id_usuario;

        if (fecha_llegada == '') {
            fecha_llegada = null;
        }
        else{
            fecha_llegada = functions.string_todatetime(fecha_llegada, 'dd/MM/yyyy', '/');
            console.log('fecha_llegada');
            console.log(fecha_llegada);
        }
        if (fecha_inicio == '') {
            fecha_inicio = null;
        }
        else{
            fecha_inicio = functions.string_todatetime(fecha_inicio, 'dd/MM/yyyy', '/');
        }
        if (fecha_fin == '') {
            fecha_fin = null;
        }
        else{
            fecha_fin = functions.string_todatetime(fecha_fin, 'dd/MM/yyyy', '/');
        }
        if (fecha_salida == '') {
            fecha_salida = null;
        }
        else{
            fecha_salida = functions.string_todatetime(fecha_salida, 'dd/MM/yyyy', '/');
        }

        ficha_model.registro(id_programacion, numero, fecha_llegada, foto_llegada,
                            fecha_inicio, foto_inicio, fecha_fin, fecha_salida, diagnostico_codigo,
                            diagnostico_nombre, diagnostico_foto, condicion_sanitaria_codigo, 
                            condicion_sanitaria_nombre, trabajo_realizado_codigo, trabajo_realizado_nombre,
                            ficha_fisica_foto, flg_envio_foto, flg_envio_audio, flg_envio_video,
                            es_descargado, id_usuario, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg
            };

            res.json(response);
        });
    },

    post_enviar_por_email : function(req, res, next)
    {
        functions.print_console('rest method ficha: post_enviar_por_email');

        var id_programacion = req.body.id_programacion;
        var email = req.body.email;
        var id_usuario = req.body.id_usuario;

        var phantom = require('phantom'); 

        phantom.create().then(function(ph) {
            ph.createPage().then(function(page) {
                page.open("https://farbis.herokuapp.com/").then(function(status) {
                    page.render('public/pdfs/' + id_programacion + '.pdf').then(function() {
                        ph.exit();

                        var response = {
                            'ws_code' : '0',
                            'mensaje' : 'OK'
                        };

                        res.json(response);
                    });
                });
            });
        });
    },

    post_lista_por_programacion : function(req, res, next)
    {
        functions.print_console('rest method: post_lista_por_programacion');

        var id_programacion = req.body.id_programacion;

        ficha_model.lista_por_programacion(id_programacion, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg, 
                'ficha' : data
            };

            res.json(response);
        });
    },

};