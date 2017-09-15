var mysql = require('mysql');
var views = require('.././routes/views');
var functions = require('.././util/functions');
var programacion_model = require('.././models/programacion_model');
var usuario_model = require('.././models/usuario_model');
var fs = require('fs');

module.exports = {
    
    /**
     * REST
     */

    post_lista_por_operario : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_lista_por_operario');

        var id_operario = req.body.id_operario;

        programacion_model.lista_por_operario(id_operario, function(msg, data){

            programacion_model.servicio_emergencia_cantidad(id_operario, function(msg, row){

                var response = {
                    'ws_code' : '0',
                    'mensaje' : msg, 
                    'ultimo_servicio_emergencia' : row,
                    'programaciones' : data
                };

                res.json(response);
            });
        });
    },

    post_actualiza_estado : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_actualizar_estado');

        var id_programacion = req.body.id_programacion;
        var estado = req.body.estado;
        var latitud = req.body.latitud;
        var longitud = req.body.longitud;
        var hora = new Date();
        
        //functions.print_console(hora.toLocaleString('es-PE'));
        programacion_model.actualiza_estado(id_programacion, estado, hora, latitud, longitud, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg,
                'fecha_hora' : functions.date_tostring(hora)
            };

            res.json(response);
        });
    },

    post_archivos_guarda : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_archivos_guarda');

        var id_programacion = req.body.id_programacion;
        var nro_orden = req.body.nro_orden;
        var anio = req.body.anio;
        
        if (req.files) {
            
            var file = req.files.imagen;
            var mensaje = '';
            var directory = 'public/files/' + anio + '-' + nro_orden + '-' +  id_programacion + '/';
            
            functions.check_directory(directory, function(err) {  
                if (err) {
                    mensaje = err;

                    var response = {
                        'ws_code' : '0',
                        'mensaje' : mensaje,
                        'ruta_archivo' : ''
                    };

                    res.json(response);

                } else {
                    //Carry on, all good, directory exists / created.
                    var ruta_archivo = directory + file.name;

                    file.mv(ruta_archivo, function(err) {

                        if (err) {
                            mensaje = err;
                        }
                        else {
                            mensaje = 'OK';
                        }

                        var full_address = req.protocol + "://" + req.headers.host;

                        var response = {
                            'ws_code' : '0',
                            'mensaje' : mensaje,
                            'ruta_archivo' : full_address + '/' + ruta_archivo.replace('public/', '')
                        };

                        res.json(response);
                    });
            
                }
            });
        }
        else {

            mensaje = 'No existen archivos.';

            var response = {
                'ws_code' : '0',
                'mensaje' : mensaje,
                'ruta_archivo' : ''
            };

            res.json(response);
        }

    },

    post_registro : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_registro');

        var id_programacion = req.body.id_programacion;
        var id_empresa = req.body.id_empresa;
        var fecha = req.body.fecha;
        var nro_orden = req.body.nro_orden;
        var cliente = req.body.cliente;
        var giro_comercial = req.body.giro_comercial;
        var direccion = req.body.direccion;
        var referencia = req.body.referencia;
        var telefonos = req.body.telefonos;
        var logo = req.body.logo;
        var geolatitud = req.body.geolatitud;
        var geolongitud = req.body.geolongitud;
        var servicio = req.body.servicio;
        var area_trabajar = req.body.area_trabajar;
        var coordino = req.body.coordino;
        var secordino = req.body.secordino;
        var celular_secordino = req.body.celular_secordino;
        var atendera = req.body.atendera;
        var personal = req.body.personal;
        var producto = req.body.producto;
        var personal_encargado = req.body.personal_encargado;
        var correo = req.body.correo;
        var nombre_vendedor = req.body.nombre_vendedor;
        var celular_vendedor = req.body.celular_vendedor;
        var nombre_programadora1 = req.body.nombre_programadora1;
        var celular_programadora1 = req.body.celular_programadora1;
        var nombre_programadora2 = req.body.nombre_programadora2;
        var celular_programadora2 = req.body.celular_programadora2;
        var nombre_programadora3 = req.body.nombre_programadora3;
        var celular_programadora3 = req.body.celular_programadora3;
        var servicio_cancelado = req.body.servicio_cancelado;
        var servicio_emergencia = req.body.servicio_emergencia;
        var id_usuario = req.body.id_usuario;
        
        if (fecha == '') {
            fecha = null;
        }
        else{
            fecha = functions.string_todatetime(fecha, 'dd/MM/yyyy', '/');
        }
        
        programacion_model.registro(id_programacion, id_empresa, fecha, nro_orden, cliente, giro_comercial, direccion, referencia,
                telefonos, logo, geolatitud, geolongitud, servicio, area_trabajar, coordino, secordino, 
                celular_secordino, atendera, personal, producto, personal_encargado, correo, nombre_vendedor,
                celular_vendedor, nombre_programadora1, celular_programadora1, nombre_programadora2, 
                celular_programadora2, nombre_programadora3, celular_programadora3, servicio_emergencia, id_usuario, 
                function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg
            };

            res.json(response);
        });
    },

    post_cambio : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_cambio');

        var id_programacion = req.body.id_programacion;
        var cambio_programacion = req.body.cambio_programacion;

        programacion_model.cambio(id_programacion, cambio_programacion, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg
            };

            res.json(response);
        });
    },

    post_lista_sin_operario : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_lista_sin_operario');

        programacion_model.lista_sin_operario(function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg, 
                'programaciones' : data
            };

            res.json(response);
        });
    },

    post_actualiza_operario : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_actualiza_operario');

        var id_programacion = req.body.id_programacion;
        var id_operario = req.body.id_operario;
        var origen = req.body.origen;

        programacion_model.actualiza_operario(id_programacion, id_operario, function(msg, data){

            if (origen == 'SEG') {

                usuario_model.obtiene_por_id(id_operario, function(msg, data){

                    var token = '';
                    
                    if (data != null) {
                        token = data['token'];

                        functions.send_push_notification(token, 'Cambio de Operario', 'Tienes un nuevo servicio asignado.', function(msg) {
                            var response = {
                                'ws_code' : '0',
                                'mensaje' : 'OK',
                                'token' : token,
                                'push' : msg
                            };

                            res.json(response);
                        });   
                    } else {
                        var response = {
                            'ws_code' : '0',
                            'mensaje' : 'OK',
                            'token' : '',
                            'push' : null
                        };

                        res.json(response);
                    }
                });

            } else {
                var response = {
                    'ws_code' : '0',
                    'mensaje' : msg,
                    'token' : '',
                    'push' : null
                };

                res.json(response);
            }
        });
    },

    post_elimina_historial : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_elimina_historial');

        var id_operario = req.body.id_operario;

        programacion_model.elimina_historial(id_operario, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg
            };

            res.json(response);
        });
    },

    post_notifica_cambio_estado : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_notifica_cambio_estado');

        var id_programacion = req.body.id_programacion;
        var estado = req.body.estado;
        var id_operario = req.body.id_operario;

        var response = {
            'ws_code' : '0',
            'mensaje' : 'OK'
        };

        res.json(response);
    },

    post_envia_mensaje_whatsapp : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_envia_mensaje_whatsapp');

        var id_programacion = req.body.id_programacion;
        var numero = req.body.numero;
        var id_operario = req.body.id_operario;

        var response = {
            'ws_code' : '0',
            'mensaje' : 'OK'
        };

        res.json(response);
    },
};