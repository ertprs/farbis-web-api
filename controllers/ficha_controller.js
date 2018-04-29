var mysql = require('mysql');
var views = require('.././routes/views');
var functions = require('.././util/functions');
var ficha_model = require('.././models/ficha_model');
var observacion_model = require('.././models/observacion_model');
var proceso_model = require('.././models/proceso_model');

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
        var productos = req.body.productos; 
        var flg_envio_foto = req.body.flg_envio_foto; 
        var flg_envio_audio = req.body.flg_envio_audio; 
        var flg_envio_video = req.body.flg_envio_video;
        var es_descargado = req.body.es_descargado; 
        var id_usuario = req.body.id_usuario;

        if (fecha_llegada == '') {
            fecha_llegada = null;
        }
        else{
            fecha_llegada = functions.string_todatetime(fecha_llegada, 'MM/dd/yyyy', '/');
        }
        if (fecha_inicio == '') {
            fecha_inicio = null;
        }
        else{
            fecha_inicio = functions.string_todatetime(fecha_inicio, 'MM/dd/yyyy', '/');
        }
        if (fecha_fin == '') {
            fecha_fin = null;
        }
        else{
            fecha_fin = functions.string_todatetime(fecha_fin, 'MM/dd/yyyy', '/');
        }
        if (fecha_salida == '') {
            fecha_salida = null;
        }
        else{
            fecha_salida = functions.string_todatetime(fecha_salida, 'MM/dd/yyyy', '/');
        }

        ficha_model.registro(id_programacion, numero, fecha_llegada, foto_llegada,
                            fecha_inicio, foto_inicio, fecha_fin, fecha_salida, diagnostico_codigo,
                            diagnostico_nombre, diagnostico_foto, condicion_sanitaria_codigo, 
                            condicion_sanitaria_nombre, trabajo_realizado_codigo, trabajo_realizado_nombre,
                            ficha_fisica_foto, productos, flg_envio_foto, flg_envio_audio, flg_envio_video,
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
                page.open("http://104.131.88.247/#!/ficha/ver/" + id_programacion).then(function(status) {
                    page.render('public/pdfs/' + id_programacion + '.pdf').then(function() {
                        ph.exit();

                        var fs = require('fs');
                        
                        fs.readFile('public/pdfs/' + id_programacion + '.pdf', function (err, data) {
                            console.log('archivo encontrado');
                            
                            const nodemailer = require('nodemailer');
                            nodemailer.SMTP = {
                                host: 'mail.orbita.pe', 
                                port: 465,
                                use_authentication: true, 
                                user: 'juancarlos@orbita.pe', 
                                pass: 'orbita2018'
                            };

                            // create reusable transporter object using the default SMTP transport
                            let transporter = nodemailer.createTransport({
                                host: 'mail.orbita.pe',
                                port: 26,
                                secure: false, // true for 465, false for other ports
                                requireTLS: true, //Force TLS
                                tls: {
                                    rejectUnauthorized: false
                                },
                                auth: {
                                    user: 'juancarlos@orbita.pe', // generated ethereal user
                                    pass: 'orbita2018' // generated ethereal password
                                }
                            });

                            // setup email data with unicode symbols
                            let mailOptions = {
                                from: '"Farbis Operaciones" <operaciones@farbis.pe>', // sender address
                                //to: 'jcarlosverase@gmail.com, baz@example.com', // list of receivers
                                to: email, // list of receivers
                                subject: 'Farbis Operaciones - Ficha Técnica', // Subject line
                                text: 'Estimado cliente', // plain text body
                                html: '<b>Estimado cliente, adjuntamos el pdf con la ficha técnica.</b>', // html body
                                attachments: [
                                {  // utf-8 string as an attachment
                                    filename: 'ficha-tecnica.pdf',
                                    content: data
                                }]
                            };

                            // send mail with defined transport object
                            transporter.sendMail(mailOptions, (error, info) => {
                                var mensaje = 'OK';
                                if (error) {
                                    mensaje = error;
                                } else {
                                    console.log('Message sent: %s', info.messageId);
                                    // Preview only available when sending through an Ethereal account
                                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                                }
                                
                                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                                var response = {
                                    'ws_code' : '0',
                                    'mensaje' : mensaje
                                };
        
                                res.json(response);
                            });
                        });
                    });
                });
            }).catch(error => {
                console.log(error);
                //phInstance.exit();
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

    post_lista_por_programacion_completa : function(req, res, next)
    {
        functions.print_console('rest method: post_lista_por_programacion_completa');

        var id_programacion = req.body.id_programacion;

        ficha_model.lista_por_programacion(id_programacion, function(msg, data){
            if (data != null) {
                // 7. Listamos los diagnosticos
                var diagnostico_arr = data.diagnostico_nombre.split(";");
                data.diagnostico_lista = [];
                diagnostico_arr.forEach(function(diagnostico) {
                    if (diagnostico != "") {
                        data.diagnostico_lista.push(diagnostico);
                    }
                });

                // 10. Listamos los trabajos realizados
                var trabajos_arr = data.trabajo_realizado_nombre.split(";");
                data.trabajo_realizado_lista = [];
                trabajos_arr.forEach(function(trabajo) {
                    if (trabajo != "") {
                        data.trabajo_realizado_lista.push(trabajo);
                    }
                });

                // 11. Listamos los productos quimicos


                // 12. Listamos las observaciones
                observacion_model.lista_por_programacion_origen(id_programacion, 'O', function(msg, data_observacion){
                    data.observacion_lista = data_observacion;

                    // 13. Listamos las recomendaciones
                    proceso_model.lista_por_programacion(id_programacion, '06', function(msg, data_recomendacion){
                        data.recomendacion_lista = data_recomendacion;

                        // 14. Listamos las incidencias
                        proceso_model.lista_por_programacion(id_programacion, '02',  function(msg, data_incidencias){
                            data.incidencia_lista = data_incidencias;

                            // 15. Listamos las personas que supervisaron
                            proceso_model.lista_por_programacion(id_programacion, '05', function(msg, data_supervisores){
                                data.supervisor_lista = data_supervisores;

                                var response = {
                                    'ws_code' : '0',
                                    'mensaje' : msg, 
                                    'ficha' : data
                                };
                
                                res.json(response);
                            });
                        });
                        // 15. Listamos las personas que supervisaron
    
                    });

                });

                
            } else {
                var response = {
                    'ws_code' : '0',
                    'mensaje' : msg, 
                    'ficha' : data
                };

                res.json(response);
            }
            
        });
    },
};