var mysql = require('mysql');
var views = require('.././routes/views');
var functions = require('.././util/functions');
var programacion_model = require('.././models/programacion_model');
var usuario_model = require('.././models/usuario_model');
var observacion_model = require('.././models/observacion_model');
var fs = require('fs');
var constants = require('.././util/constants');

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
                function(msg, data, id){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg,
                'id_programacion' : id
            };

            res.json(response);
        });
    },

    post_registro_multiple : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_registro_multiple');

        var programaciones = req.body;
        var ids = [];
        var arr_programaciones = [];
        var arr_ids = [];
        var str_ids = "(";

        programaciones.forEach(function(programacion, index) {
            //console.log(programacion.id_programacion);
            var id_programacion = programacion.id_programacion;
            var id_empresa = programacion.id_empresa;
            var fecha = programacion.fecha;
            var nro_orden = programacion.nro_orden;
            var cliente = programacion.cliente;
            var giro_comercial = programacion.giro_comercial;
            var direccion = programacion.direccion;
            var referencia = programacion.referencia;
            var telefonos = programacion.telefonos;
            var logo = programacion.logo;
            var geolatitud = programacion.geolatitud;
            var geolongitud = programacion.geolongitud;
            var servicio = programacion.servicio;
            var area_trabajar = programacion.area_trabajar;
            var coordino = programacion.coordino;
            var secordino = programacion.secordino;
            var celular_secordino = programacion.celular_secordino;
            var atendera = programacion.atendera;
            var personal = programacion.personal;
            var producto = programacion.producto;
            var personal_encargado = programacion.personal_encargado;
            var correo = programacion.correo;
            var nombre_vendedor = programacion.nombre_vendedor;
            var celular_vendedor = programacion.celular_vendedor;
            var nombre_programadora1 = programacion.nombre_programadora1;
            var celular_programadora1 = programacion.celular_programadora1;
            var nombre_programadora2 = programacion.nombre_programadora2;
            var celular_programadora2 = programacion.celular_programadora2;
            var nombre_programadora3 = programacion.nombre_programadora3;
            var celular_programadora3 = programacion.celular_programadora3;
            var servicio_cancelado = programacion.servicio_cancelado;
            var servicio_emergencia = programacion.servicio_emergencia;
            var id_usuario = programacion.id_usuario;
            //var observaciones = programacion.observaciones;
            
            if (fecha == '') {
                fecha = null;
            }
            else{
                fecha = functions.string_todatetime(fecha, 'dd/MM/yyyy', '/');
            }
            
            arr_programaciones.push([
                id_programacion, id_empresa, fecha, nro_orden, cliente, giro_comercial, direccion, referencia,
                telefonos, logo, geolatitud, geolongitud, servicio, area_trabajar, coordino, secordino,
                celular_secordino, atendera, personal, producto, personal_encargado, 'PEN', 
                'N', 'N', 'N', '', 'T', correo, nombre_vendedor, celular_vendedor, nombre_programadora1, 
                celular_programadora1, nombre_programadora2, celular_programadora2, nombre_programadora3, 
                celular_programadora3, 'N', servicio_emergencia, id_usuario, 'NOW()'
            ]);
            arr_ids.push([
                id_programacion, 
            ]);
            str_ids += "'" + id_programacion + "',";
        });

        str_ids += "'')";

        programacion_model.valida_multiple(str_ids, function(msg, data, id){
            var response = {
                'ws_code' : '0',
                'mensaje' : msg,
                'programaciones' : data
            };
        
            res.json(response);
            /*
            data.forEach(function(programacion, index) {


            });

            programacion_model.registro_multiple(str_ids, function(msg, data, id){

                var response = {
                    'ws_code' : '0',
                    'mensaje' : msg,
                    'programaciones' : data
                };
            
                res.json(response);
            });
            */
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

    post_obtiene_personal : function(req, res, next)
    {
        functions.print_console('rest method: post_obtiene_personal');

        var id_programacion = req.body.id_programacion;

        programacion_model.obtiene_personal(id_programacion, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg, 
                'programacion' : data
            };

            res.json(response);
        });
    },

    post_lista_sin_descargar : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_lista_sin_descargar');

        programacion_model.lista_sin_descargar(function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg, 
                'programaciones' : data
            };

            res.json(response);
        });
    },

    post_actualiza_descargado : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_actualiza_descargado');

        var id_programacion = req.body.id_programacion;
        
        programacion_model.actualiza_descargado(id_programacion, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg
            };

            res.json(response);
        });
    },

    get_descarga : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_actualiza_descargado');

        var id_programacion = req.params.id_programacion;

        programacion_model.obtener(id_programacion, function(msg, programacion){

            var directory = programacion.fecha.getFullYear() + '-' + programacion.nro_orden + '-' +  programacion.id_programacion;
            var full_directory = 'public/files/' + directory + '/';
            var filename = '';
            var file = constants.dirname + 'public/zip/' + directory + '.zip';
            var fileFolder = constants.dirname + 'public/files/' + directory + '/';
            var currentPath = full_directory;
            fs.exists(file, function(exists) {
                if (exists) {
                    fs.unlinkSync(file); // Delete file
                } else {
                }
            });

            fs.exists(fileFolder, function(exists) {
                if (exists) {
                    // Contamos los archivos en la carpeta
                    var path = require('path');
                    var files = fs.readdirSync(currentPath);
                    if (files.length > 0) {
                        var options = {
                            excludeParentFolder: false, //Default : false. if true, the content will be zipped excluding parent folder.
                            parentFolderName: directory //if specified, the content will be zipped, within the 'v1.0' folder
                        };
                        
                        //zip a folder and change folder destination name
                        var FolderZip = require('folder-zip');
                        var zip = new FolderZip();
                        zip.zipFolder(full_directory, options, function(){
                            zip.writeToFile('public/zip/' + directory + '.zip');

                            setTimeout(function() {
                                fs.exists(file, function(exists) {
                                    if (exists) {
                                        res.download(file);
                                    } else {
                                        res.write('El archivo ' + directory + '.zip no existe');
                                        res.end();
                                    }
                                });
                            }, 3000);
                        });
                    }
                } else {
                    res.write('La carpeta ' + directory + ' no existe');
                    res.end();
                }
            });
        });
    },

    /**
     * WEB
     */
    index : function(req, res, next)
    {
        var id_operario = req.body.id_operario;
        functions.print_console("id operario: " + id_operario);
        id_operario = 1;
        programacion_model.lista_por_operario(id_operario, function(msg, data){

            res.render('programacion/index', { 
                titulo: "Programaciones",
                programaciones: data
             });    
        });
    },

};