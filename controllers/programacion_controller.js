
var mysql = require('mysql');
var views = require('.././routes/views');
var functions = require('.././util/functions');
var programacion_model = require('.././models/programacion_model');
var usuario_model = require('.././models/usuario_model');
var observacion_model = require('.././models/observacion_model');
var ficha_model = require('.././models/ficha_model');
var fs = require('fs');
var constants = require('.././util/constants');

var path = require('path');


module.exports = {
    
    /**
     * REST
     */

    post_lista_por_operario : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_lista_por_operario');

        var id_operario = req.body.id_operario;

        programacion_model.lista_por_operario(id_operario, function(msg, data){

            var connection = require('.././database/connection');
            var pool = connection.get_pool();
            pool.getConnection(function(err, pool_cnx) {
                if (err) {
                    console.error('error get_pool_connection: ' + err.stack);
                }
                programacion_model.servicio_emergencia_cantidad(id_operario, pool_cnx, function(msg, row){

                    var response = {
                        'ws_code' : '0',
                        'mensaje' : msg, 
                        'ultimo_servicio_emergencia' : row,
                        'programaciones' : data
                    };
    
                    pool_cnx.release();
                    pool.end();

                    res.json(response);
                });
            });
        });
    },

    post_lista_por_operario_fecha : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_lista_por_operario_fecha');

        var id_operario = req.body.id_operario;
        var fecha = req.body.fecha;
        var connection = require('.././database/connection');
        var pool = connection.get_pool();
        pool.getConnection(function(err, pool_cnx) {
            if (err) {
                console.error('error get_pool_connection: ' + err.stack);
            }
   
            programacion_model.lista_por_operario_fecha(id_operario, fecha, function(msg, data_programacion){
                if (data_programacion.length > 0) {
                    data_programacion.forEach(function(programacion, index_programacion) {
                        var personal = programacion.personal;
                        var personal_encargado = programacion.personal_encargado;
                        var personal_supervisor = programacion.personal_supervisor;
                        var personal_ids_arr = personal.split("-");
                        var personal_encargado_ids_arr = personal_encargado.split("-");
                        var personal_supervisor_ids_arr = personal_supervisor.split("-");
                        var personal_arr = [];
                        var personal_encargado_arr = [];
                        var personal_supervisor_arr = [];
                        
                        if (personal_ids_arr.length > 0) {
                            var str_ids = "(";
                            personal_ids_arr.forEach(function(id_usuario, index_personal) {
                                str_ids += "'" + id_usuario + "',";
                            });
    
                            str_ids += "'')";
    
                            usuario_model.obtiene_por_id_multiple(str_ids, pool_cnx, function(msg, data_usuario){
                                
                                if (data_usuario) {
                                    data_usuario.forEach(function(usuario, index_usuario) {
                                        personal_arr.push(usuario.nombres + " " + usuario.apellidos);
                                    });
                                }
                                
                                programacion.personal_format = personal_arr;
                                
                                if (data_programacion.length == index_programacion + 1) {
                                    var response = {
                                        'ws_code' : '0',
                                        'mensaje' : msg,
                                        'programaciones' : data_programacion
                                    };
                        
                                    pool_cnx.release();
                                    pool.end();

                                    res.json(response);
                                }
                                
                            });
    
                        } else {
                            programacion.personal_format = personal_arr;
        
                            if (data_programacion.length == index_programacion + 1) {
                                var response = {
                                    'ws_code' : '0',
                                    'mensaje' : msg,
                                    'programaciones' : data_programacion
                                };
                    
                                res.json(response);
                            }
                        }
                        
                    });
                } else {
                    var response = {
                        'ws_code' : '0',
                        'mensaje' : msg,
                        'programaciones' : data_programacion
                    };
        
                    res.json(response);
                }
                
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
        var celular_coordino = req.body.celular_coordino;
        var secordino = req.body.secordino;
        var celular_secordino = req.body.celular_secordino;
        var atendera = req.body.atendera;
        var celular_atendera = req.body.celular_atendera;
        var personal = req.body.personal;
        var producto = req.body.producto;
        var personal_encargado = req.body.personal_encargado;
        var personal_supervisor = req.body.personal_supervisor;
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
        var indicaciones = req.body.indicaciones;
        
        if (fecha == '') {
            fecha = null;
        }
        else{
            fecha = functions.string_todatetime(fecha, 'MM/dd/yyyy', '/');
        }

        if (celular_coordino == null) {
            celular_coordino = '';
        }
        /*
        if (personal == '') {
            personal = personal_encargado;
        }
        if (personal_encargado == '') {
            personal_encargado = personal;
        }
        */
        programacion_model.registro(id_programacion, id_empresa, fecha, nro_orden, cliente, giro_comercial, direccion, referencia,
                telefonos, logo, geolatitud, geolongitud, servicio, area_trabajar, coordino, celular_coordino, secordino, 
                celular_secordino, atendera, celular_atendera, personal, producto, personal_encargado, personal_supervisor, correo, 
                nombre_vendedor, celular_vendedor, nombre_programadora1, celular_programadora1, nombre_programadora2, 
                celular_programadora2, nombre_programadora3, celular_programadora3, servicio_emergencia, id_usuario, 
                function(msg, data, id){



            if (indicaciones != null) {
                var arr_indicaciones = [];
                indicaciones.forEach(function(indica, index) {
                
                    var id_programacion = id;
                    var item = index + 1;
                    var observacion = indica;
                    var origen = 'P';
                    var ruta_foto = '';//obs.ruta_foto;
                    var ruta_audio = '';//obs.ruta_audio;
                    //var id_usuario = obs.id_usuario;
                    var fecha = new Date();

                    arr_indicaciones.push([
                        id_programacion, item, observacion, origen, ruta_foto, ruta_audio, '1', id_usuario, fecha
                    ]);
                });

                if (arr_indicaciones.length > 0) {
                    observacion_model.registro_multiple(arr_indicaciones, function(msg, data, item, fecha){

                        var response = {
                            'ws_code' : '0',
                            'mensaje' : 'OK',
                            'id_programacion' : id
                        };
                
                        res.json(response);
                    });
                } else {
                    var response = {
                        'ws_code' : '0',
                        'mensaje' : 'OK',
                        'id_programacion' : id
                    };
            
                    res.json(response);
                }

            } else {
                var response = {
                    'ws_code' : '0',
                    'mensaje' : msg,
                    'id_programacion' : id
                };
    
                res.json(response);
            }

        });
    },

    post_registro_multiple : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_registro_multiple');

        var programaciones = req.body;
        var arr_programaciones = [];
        var arr_ids = [];
        var str_ids = "(";
        var arr_result = [];

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
            var celular_coordino = programacion.celular_coordino;
            var secordino = programacion.secordino;
            var celular_secordino = programacion.celular_secordino;
            var atendera = programacion.atendera;
            var celular_atendera = programacion.celular_atendera;
            var personal = programacion.personal;
            var producto = programacion.producto;
            var personal_encargado = programacion.personal_encargado;
            var personal_supervisor = programacion.personal_supervisor;
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
            //35
            
            if (fecha == '') {
                fecha = null;
            }
            else{
                fecha = functions.string_todatetime(fecha, 'MM/dd/yyyy', '/');
            }
            if (celular_coordino == null) {
                celular_coordino = '';
            }
            
            arr_programaciones.push([
                id_programacion, id_empresa, fecha, nro_orden, cliente, giro_comercial, direccion, referencia,
                telefonos, logo, geolatitud, geolongitud, servicio, area_trabajar, coordino, celular_coordino, secordino,
                celular_secordino, atendera, celular_atendera, personal, producto, personal_encargado, 'PEN', 
                'N', 'N', 'N', ' ', 'T', correo, nombre_vendedor, celular_vendedor, nombre_programadora1, 
                celular_programadora1, nombre_programadora2, celular_programadora2, nombre_programadora3, 
                celular_programadora3, 'N', servicio_emergencia, id_usuario, new Date(), ' ', personal_supervisor
            ]);
            arr_ids.push([
                id_programacion, 
            ]);
            arr_result.push(
                {
                    "id_programacion" : id_programacion, 
                    "mensaje" : "OK"
                }
            );

            str_ids += "'" + id_programacion + "',";
        });

        str_ids += "'')";

        programacion_model.valida_multiple(str_ids, function(msg, data, id){

            if (data != null) {
                
                var arr_programaciones_final = [];
                var arr_fichas = [];
                var id_programacion = "";
                var existe = false;
    
                programaciones.forEach(function(programacion, index) {
                    id_programacion = programacion.id_programacion;
                    existe = false;
                    
                    data.forEach(function(prog, index) {
                        if (id_programacion == prog.id_programacion) {
                            existe = true;
                        }
                    });
    
                    if (existe == false) {
                        arr_programaciones_final.push(arr_programaciones[index]);

                        arr_fichas.push([
                            programacion.id_programacion, '', null, '',
                            null, '', null, null, 0, 
                            '', '', 0, '', 0, '', 
                            '', 'N', 'N', 'N', 'N', programacion.id_usuario, new Date(), '', ''
                        ]);
                    }
                });

                arr_result.forEach(function(result, index) {
                    data.forEach(function(prog, index) {
                        if (result.id_programacion == prog.id_programacion) {
                            result.mensaje = "No se registro, ya existe.";
                        }
                    });
                });

                if (arr_programaciones_final.length > 0) {
                    programacion_model.registro_multiple(arr_programaciones_final, function(msg, data, id){
                        console.log('prog registro_multiple: ' + msg);
                        if (msg == "OK") {
                            ficha_model.registro_multiple(arr_fichas, function(msg){
                                var response = {
                                    'ws_code' : '0',
                                    'mensaje' : msg,
                                    'programaciones' : arr_result
                                };
                            
                                res.json(response);
                            });    
                        } else {
                            var response = {
                                'ws_code' : '0',
                                'mensaje' : msg,
                                'programaciones' : arr_result
                            };
                        
                            res.json(response);
                        }
                    });
                } else {
                    var response = {
                        'ws_code' : '0',
                        'mensaje' : 'No hay programaciones nuevas.',
                        'programaciones' : arr_result
                    };
                
                    res.json(response);
                }
            } else {
                var response = {
                    'ws_code' : '0',
                    'mensaje' : 'No hay programaciones nuevas.',
                    'programaciones' : arr_result
                };
            
                res.json(response);
            }
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

            if (data == null) {
                var response = {
                    'ws_code' : '0',
                    'mensaje' : 'La programación no existe', 
                    'programacion' : null
                };
    
                res.json(response);
            }
                    var personal_ids = data.personal.split("-");
                    var personal_encargado_ids = data.personal_encargado.split("-");
                    var personal_supervisor_ids = data.personal_supervisor.split("-");
                    var personal_arr = [];

                    personal_ids.forEach(function(id_usuario, idx) {
                        if (id_usuario != '') {
                            personal_arr.push({
                                'id_usuario' : id_usuario, 'tipo' : '1',
                                'nombres' : '', 'apellidos' : '', 'telefono' : ''
                            });
                        }
                    });

                    personal_encargado_ids.forEach(function(id_usuario, idx) {
                        if (id_usuario != '') {
                            personal_arr.push({
                                'id_usuario' : id_usuario, 'tipo' : '5',
                                'nombres' : '', 'apellidos' : '', 'telefono' : ''
                            });
                        }
                    });
                    
                    personal_supervisor_ids.forEach(function(id_usuario, idx) {
                        if (id_usuario != '') {
                            personal_arr.push({
                                'id_usuario' : id_usuario, 'tipo' : '2',
                                'nombres' : '', 'apellidos' : '', 'telefono' : ''
                            });
                        }
                    });

                    if (personal_arr.length == 0) {
                        personal_arr.push({
                            'id_usuario' : '0000', 'tipo' : '0',
                            'nombres' : '', 'apellidos' : '', 'telefono' : ''
                        });
                    }
                    if (personal_arr.length > 0) {
                        var str_ids = "(";
                        personal_arr.forEach(function(usuario, index_personal) {
                            str_ids += "'" + usuario.id_usuario + "',";
                        });

                        str_ids += "'')";

                        var connection = require('.././database/connection');
                        var pool = connection.get_pool();
                        pool.getConnection(function(err, pool_cnx) {
                            if (err) {
                                console.error('error get_pool_connection: ' + err.stack);
                            }

                            usuario_model.obtiene_por_id_multiple(str_ids, pool_cnx, function(msg, data_usuario){
                                console.log('data_usuario:');
                                console.log(data_usuario);
                                if (data_usuario) {
                                    if (data_usuario.length > 0) {
                                        data_usuario.forEach(function(usu, index_usuario) {
                                            personal_arr.forEach(function(usuario, idx) {
                                                if (usuario.id_usuario == usu.id_usuario) {
                                                    usuario.nombres = usu.nombres;
                                                    usuario.apellidos = usu.apellidos;
                                                    usuario.telefono = usu.telefono;
                                                } 
                                            });
                                        });  
                                    } else {
                                        personal_arr = [];
                                    }
                                }
                                
                                data.personal_format = personal_arr;
    
                                var response = {
                                    'ws_code' : '0',
                                    'mensaje' : msg,
                                    'programacion' : data
                                };
    
                                pool_cnx.release();
                                pool.end();

                                res.json(response);
                            });
                        });
			
                    } else {
    
                        data.personal_format = personal_arr;

                        var response = {
                            'ws_code' : '0',
                            'mensaje' : msg,
                            'programacion' : data
                        };
                        
                        res.json(response);
                    }
                    /*
            var response = {
                'ws_code' : '0',
                'mensaje' : msg, 
                'programacion' : data
            };

            res.json(response);
            */
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
        functions.print_console('rest method programacion: get_descarga');

        var id_programacion = req.params.id_programacion;

        programacion_model.obtener(id_programacion, function(msg, programacion){
            //console.log(programacion);
            var directory = programacion.fecha.getFullYear() + '-' + programacion.nro_orden + '-' +  programacion.id_programacion;
            var full_directory = 'public/files/' + directory + '/';
            var filename = '';
            var file = constants.dirname + 'public/zip/' + directory + '.zip';
            var fileFolder = constants.dirname + 'public/files/' + directory + '/';
            var currentPath = full_directory;

            
            console.log('Verificando carpeta ...');
            fs.exists(file, function(exists) {
                if (exists) {
                    fs.unlinkSync(file); // Delete file
                } else {
                }
            });
            
            var files = [
                {source : 'index.js',target:'index.js'},
                {target : 'img'},//if source is null,means make a folder
                {source : 'jszip.js',target:'lib/tmp.js'}
            ];

            console.log('Zippeando ...');
            fs.exists(fileFolder, function(exists) {
                if (exists) {
                    var FolderZip = require('folder-zip');
                    var zip = new FolderZip();
                    var nombre_archivo_lg = directory + ".zip";

                    console.log('Carpeta: ' + nombre_archivo_lg);

                    var options = {
                        excludeParentFolder: false, //Default : false. if true, the content will be zipped excluding parent folder.
                        parentFolderName: '' //if specified, the content will be zipped, within the 'v1.0' folder
                    };
                    
                    zip.zipFolder('../public/files/2019-2019 000011-0000033509', options, function(){
                        zip.writeToFile('public/zip/zipall.zip', function() {
                            console.log('Creado');
                            var filePath = "public/zip/zipall.zip";
                            setTimeout(function () {
                                console.log(filePath);
                                
                                fs.readFile(filePath, function (err, file){
                                    if (err) {
                                        res.writeHead(500, {
                                          "Content-Type": "binary"
                                        });
                                        res.write(err + "\n");
                                        res.end();
                                        return;
                                    }
                                    res.writeHead(200, {
                                        "Content-Disposition": "attachment;filename=" + nombre_archivo_lg,
                                        'Content-Type': 'application/zip',
                                        'Content-Length': file.length
                                    });
                                    res.write(file);
                                    res.end();
                                });                        
                            }, 1000);
                        });
                    });

                    /*
                    console.log('Agregando archivo ...');
                    zip.addFile('2019-2019 000011-0000033509-00006-1-1-DET.jpg', 'public/files/2019-2019 000011-0000033509/2019-2019 000011-0000033509-00006-1-1-DET.jpg', function () {
                        console.log('Agregado');
                        zip.writeToFile('public/zip/' + nombre_archivo_lg, function() {
                            console.log('Creado');
                            var filePath = "public/zip/" + nombre_archivo_lg;
                            setTimeout(function () {
                                console.log(filePath);
                                
                                fs.readFile(filePath, function (err, file){
                                    if (err) {
                                        res.writeHead(500, {
                                          "Content-Type": "binary"
                                        });
                                        res.write(err + "\n");
                                        res.end();
                                        return;
                                    }
                                    res.writeHead(200, {
                                        "Content-Disposition": "attachment;filename=" + nombre_archivo_lg,
                                        'Content-Type': 'application/zip',
                                        'Content-Length': file.length
                                    });
                                    res.write(file);
                                    res.end();
                                });                        
                            }, 1000);
                        });
                        
                    });
                    */

                }
            });
            
            
            /*
            console.log('aqui 0');
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
                        console.log('aqui 1');
                        //zip a folder and change folder destination name
                        var FolderZip = require('folder-zip');
                        var zip = new FolderZip();
                        console.log(full_directory);
                        console.log(directory);
                        //zip.zipFolder('../public/files/2019-2019 000011-0000033509', options, function(err){
                        zip.zipFolder('public/files/2019-2019\ 000011-0000033509', function(err){
                            if (err) {
                                console.log('Error A =>');
                                console.log(err);
                            }
                            zip.writeToFile('public/zip/' + directory + '.zip', function(err) {
                                if (err) {
                                    console.log('Error B =>');
                                    console.log(err);
                                }
                                console.log('aqui 2');
                                fs.exists(file, function(exists) {
                                    if (exists) {
                                        console.log('aqui 3');
                                        res.download(file);
                                    } else {
                                        console.log('aqui 4');
                                        res.write('El archivo ' + directory + '.zip no existe');
                                        res.end();
                                    }
                                });
                            });
                            res.write('Error controlado B');
                            res.end();
                        });
                        //res.write('Error controlado A');
                        //res.end();
                    }
                } else {
                    res.write('La carpeta ' + directory + ' no existe');
                    res.end();
                }
            });
            */

        });
    },

    post_descarga_archivos : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_descarga_archivos');

        var id_programacion = req.body.id_programacion;

        programacion_model.obtener(id_programacion, function(msg, programacion){
            
            var host = "http://142.93.77.117/files/";
            var directory = programacion.fecha.getFullYear() + '-' + programacion.nro_orden + '-' +  programacion.id_programacion;
            var full_directory = 'public/files/' + directory + '/';
            var filesToReturn = [];
            // http://142.93.77.117/files/2017-000001-P000000001/img010.jpg

            var files = fs.readdirSync(full_directory);
            for (var i in files) {
                var curFile = path.join(full_directory, files[i]);      
                if (fs.statSync(curFile).isFile()) {
                    filesToReturn.push(host + directory + '/' + curFile.replace(full_directory, ''));
                    /*
                    var link = curFile.replace(full_directory, '');
                    link = curFile.replace('public/', '');
                    console.log(link);
                    */
                }
            }

            var response = {
                'ws_code' : '0',
                'mensaje' : 'OK', 
                'archivos' : filesToReturn
            };

            res.json(response);
        });
    },

    post_obtener_por_id : function(req, res, next)
    {
        functions.print_console('rest method: post_obtener_por_id');

        var id_programacion = req.body.id_programacion;

        programacion_model.obtener(id_programacion, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg, 
                'programacion' : data
            };

            res.json(response);
        });
    },

    post_actualiza_operarios : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_actualiza_operarios');

        var id_programacion = req.body.id_programacion;
        var id_operarios = req.body.id_operarios;
        var origen = req.body.origen;

        programacion_model.actualiza_operarios(id_programacion, id_operarios, function(msg, data){

            if (origen == 'SEG') {

                usuario_model.obtiene_por_id(id_operarios, function(msg, data){

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

    post_actualiza_encargados : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_actualiza_encargados');

        var id_programacion = req.body.id_programacion;
        var id_encargados = req.body.id_encargados;
        var origen = req.body.origen;

        programacion_model.actualiza_encargados(id_programacion, id_encargados, function(msg, data){

            if (origen == 'SEG') {

                usuario_model.obtiene_por_id(id_encargados, function(msg, data){

                    var token = '';
                    
                    if (data != null) {
                        token = data['token'];

                        functions.send_push_notification(token, 'Cambio de Encargado', 'Tienes un nuevo servicio asignado.', function(msg) {
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

    post_actualiza_supervisores : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_actualiza_supervisores');

        var id_programacion = req.body.id_programacion;
        var id_supervisores = req.body.id_supervisores;
        var origen = req.body.origen;

        programacion_model.actualiza_supervisores(id_programacion, id_supervisores, function(msg, data){

            if (origen == 'SEG') {

                usuario_model.obtiene_por_id(id_supervisores, function(msg, data){

                    var token = '';
                    
                    if (data != null) {
                        token = data['token'];

                        functions.send_push_notification(token, 'Cambio de Supervisores', 'Tienes un nuevo servicio asignado.', function(msg) {
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

    post_lista_por_fecha : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_lista_por_fecha');

        var fecha = req.body.fecha;

        programacion_model.lista_por_fecha(fecha, function(msg, data_programacion){
            if (data_programacion.length > 0) {
                data_programacion.forEach(function(programacion, index_programacion) {
                    var personal_ids = programacion.personal.split("-");
                    var personal_encargado_ids = programacion.personal_encargado.split("-");
                    var personal_supervisor_ids = programacion.personal_supervisor.split("-");
                    var personal_arr = [];

                    personal_ids.forEach(function(id_usuario, idx) {
                        if (id_usuario != '') {
                            personal_arr.push({
                                'id_usuario' : id_usuario, 'tipo' : '1',
                                'nombres' : '', 'apellidos' : '', 'telefono' : ''
                            });
                        }
                    });

                    personal_encargado_ids.forEach(function(id_usuario, idx) {
                        if (id_usuario != '') {
                            personal_arr.push({
                                'id_usuario' : id_usuario, 'tipo' : '5',
                                'nombres' : '', 'apellidos' : '', 'telefono' : ''
                            });
                        }
                    });
                    
                    personal_supervisor_ids.forEach(function(id_usuario, idx) {
                        if (id_usuario != '') {
                            personal_arr.push({
                                'id_usuario' : id_usuario, 'tipo' : '2',
                                'nombres' : '', 'apellidos' : '', 'telefono' : ''
                            });
                        }
                    });

                    if (personal_arr.length == 0) {
                        personal_arr.push({
                            'id_usuario' : '0000', 'tipo' : '0',
                            'nombres' : '', 'apellidos' : '', 'telefono' : ''
                        });
                    }
                    if (personal_arr.length > 0) {
                        var str_ids = "(";
                        personal_arr.forEach(function(usuario, index_personal) {
                            str_ids += "'" + usuario.id_usuario + "',";
                        });

                        str_ids += "'')";

                        var connection = require('.././database/connection');
                        var pool = connection.get_pool();
                        pool.getConnection(function(err, pool_cnx) {
                            if (err) {
                                console.error('error get_pool_connection: ' + err.stack);
                            }

                            usuario_model.obtiene_por_id_multiple(str_ids, pool_cnx, function(msg, data_usuario){
                                console.log('data_usuario:');
                                console.log(data_usuario);
                                if (data_usuario) {
                                    if (data_usuario.length > 0) {
                                        data_usuario.forEach(function(usu, index_usuario) {
                                            personal_arr.forEach(function(usuario, idx) {
                                                if (usuario.id_usuario == usu.id_usuario) {
                                                    usuario.nombres = usu.nombres;
                                                    usuario.apellidos = usu.apellidos;
                                                    usuario.telefono = usu.telefono;
                                                } 
                                            });
                                        });  
                                    } else {
                                        personal_arr = [];
                                    }
                                }
                                
                                programacion.personal_format = personal_arr;
    
                                if (data_programacion.length == index_programacion + 1) {
                                    var response = {
                                        'ws_code' : '0',
                                        'mensaje' : msg,
                                        'programaciones' : data_programacion
                                    };
    
                                    pool_cnx.release();
                                    pool.end();

                                    res.json(response);
                                }
                            });
                        });
                        
                    } else {
                        programacion.personal_format = personal_arr;
    
                        if (data_programacion.length == index_programacion + 1) {
                            var response = {
                                'ws_code' : '0',
                                'mensaje' : msg,
                                'programaciones' : data_programacion
                            };
                            
                            res.json(response);
                        }
                    }
                    
                });
            } else {
                var response = {
                    'ws_code' : '0',
                    'mensaje' : msg,
                    'programaciones' : data_programacion
                };
                
                res.json(response);
            }
            
        });
    },
/*
    post_lista : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_lista');

        var id_operario = req.body.id_operario;

        var connection = require('.././database/connection');
        var pool = connection.get_pool();
        programacion_model.lista(pool, function(msg, data_programacion){
            if (data_programacion.length > 0) {
                data_programacion.forEach(function(programacion, index_programacion) {

                    observacion_model.lista_por_programacion(programacion.id_programacion, pool, function(msg, observaciones){

                        programacion.observaciones = observaciones;

                        // Listamos el personal
                        var personal_ids = programacion.personal.split("-");
                        var personal_encargado_ids = programacion.personal_encargado.split("-");
                        var personal_supervisor_ids = programacion.personal_supervisor.split("-");
                        var personal_arr = [];

                        personal_ids.forEach(function(id_usuario, idx) {
                            if (id_usuario != '') {
                                personal_arr.push({
                                    'id_usuario' : id_usuario, 'tipo' : '1',
                                    'nombres' : '', 'apellidos' : '', 'telefono' : ''
                                });
                            }
                        });

                        personal_encargado_ids.forEach(function(id_usuario, idx) {
                            if (id_usuario != '') {
                                personal_arr.push({
                                    'id_usuario' : id_usuario, 'tipo' : '5',
                                    'nombres' : '', 'apellidos' : '', 'telefono' : ''
                                });
                            }
                        });

                        personal_supervisor_ids.forEach(function(id_usuario, idx) {
                            if (id_usuario != '') {
                                personal_arr.push({
                                    'id_usuario' : id_usuario, 'tipo' : '2',
                                    'nombres' : '', 'apellidos' : '', 'telefono' : ''
                                });
                            }
                        });

                        if (personal_arr.length == 0) {
                            personal_arr.push({
                                'id_usuario' : '0000', 'tipo' : '0',
                                'nombres' : '', 'apellidos' : '', 'telefono' : ''
                            });
                        }
                        if (personal_arr.length > 0) {
                            var str_ids = "(";
                            personal_arr.forEach(function(usuario, index_personal) {
                                str_ids += "'" + usuario.id_usuario + "',";
                            });

                            str_ids += "'')";

                            usuario_model.obtiene_por_id_multiple(str_ids, pool, function(msg, data_usuario){
                                if (data_usuario) {
                                    if (data_usuario.length > 0) {
                                        data_usuario.forEach(function(usu, index_usuario) {
                                            personal_arr.forEach(function(usuario, idx) {
                                                if (usuario.id_usuario == usu.id_usuario) {
                                                    usuario.nombres = usu.nombres;
                                                    usuario.apellidos = usu.apellidos;
                                                    usuario.telefono = usu.telefono;
                                                } 
                                            });
                                        });  
                                    } else {
                                        personal_arr = [];
                                    }
                                }
                                
                                programacion.personal_format = personal_arr;

                                if (data_programacion.length == index_programacion + 1) {

                                    programacion_model.servicio_emergencia_cantidad(id_operario, pool, function(msg, row){

                                        var response = {
                                            'ws_code' : '0',
                                            'mensaje' : msg, 
                                            'ultimo_servicio_emergencia' : row,
                                            'programaciones' : data_programacion
                                        };

                                        res.json(response);
                                    });
                                }
                            });

                        } else {
                            programacion.personal_format = personal_arr;

                            if (data_programacion.length == index_programacion + 1) {

                                programacion_model.servicio_emergencia_cantidad(id_operario, pool, function(msg, row){

                                    var response = {
                                        'ws_code' : '0',
                                        'mensaje' : msg, 
                                        'ultimo_servicio_emergencia' : row,
                                        'programaciones' : data_programacion
                                    };

                                    res.json(response);
                                });
                            }
                        }
                    });
                });
            } else {

                programacion_model.servicio_emergencia_cantidad(id_operario, pool, function(msg, row){

                    var response = {
                        'ws_code' : '0',
                        'mensaje' : msg, 
                        'ultimo_servicio_emergencia' : row,
                        'programaciones' : data_programacion
                    };
    
                    res.json(response);
                });
            }
        });
    },
*/
    post_lista : function(req, res, next)
    {
        functions.print_console('rest method programacion: post_lista');

        var id_operario = req.body.id_operario;

        var connection = require('.././database/connection');
        var pool = connection.get_pool();
        //var pool_cnx = connection.get_pool_connection();
        pool.getConnection(function(err, pool_cnx) {
            if (err) {
                console.error('error get_pool_connection: ' + err.stack);
            }

            programacion_model.lista(pool_cnx, function(msg, data_programacion){
                if (data_programacion.length > 0) {
                    data_programacion.forEach(function(programacion, index_programacion) {
    
                        observacion_model.lista_por_programacion(programacion.id_programacion, pool_cnx, function(msg, observaciones){
    
                            programacion.observaciones = observaciones;
    
                            // Listamos el personal
                            var personal_ids = programacion.personal.split("-");
                            var personal_encargado_ids = programacion.personal_encargado.split("-");
                            var personal_supervisor_ids = programacion.personal_supervisor.split("-");
                            var personal_arr = [];
    
                            personal_ids.forEach(function(id_usuario, idx) {
                                if (id_usuario != '') {
                                    personal_arr.push({
                                        'id_usuario' : id_usuario, 'tipo' : '1',
                                        'nombres' : '', 'apellidos' : '', 'telefono' : ''
                                    });
                                }
                            });
    
                            personal_encargado_ids.forEach(function(id_usuario, idx) {
                                if (id_usuario != '') {
                                    personal_arr.push({
                                        'id_usuario' : id_usuario, 'tipo' : '5',
                                        'nombres' : '', 'apellidos' : '', 'telefono' : ''
                                    });
                                }
                            });
    
                            personal_supervisor_ids.forEach(function(id_usuario, idx) {
                                if (id_usuario != '') {
                                    personal_arr.push({
                                        'id_usuario' : id_usuario, 'tipo' : '2',
                                        'nombres' : '', 'apellidos' : '', 'telefono' : ''
                                    });
                                }
                            });
    
                            if (personal_arr.length == 0) {
                                personal_arr.push({
                                    'id_usuario' : '0000', 'tipo' : '0',
                                    'nombres' : '', 'apellidos' : '', 'telefono' : ''
                                });
                            }
                            if (personal_arr.length > 0) {
                                var str_ids = "(";
                                personal_arr.forEach(function(usuario, index_personal) {
                                    str_ids += "'" + usuario.id_usuario + "',";
                                });
    
                                str_ids += "'')";
    
                                usuario_model.obtiene_por_id_multiple(str_ids, pool_cnx, function(msg, data_usuario){
                                    if (data_usuario) {
                                        if (data_usuario.length > 0) {
                                            data_usuario.forEach(function(usu, index_usuario) {
                                                personal_arr.forEach(function(usuario, idx) {
                                                    if (usuario.id_usuario == usu.id_usuario) {
                                                        usuario.nombres = usu.nombres;
                                                        usuario.apellidos = usu.apellidos;
                                                        usuario.telefono = usu.telefono;
                                                    } 
                                                });
                                            });  
                                        } else {
                                            personal_arr = [];
                                        }
                                    }
                                    
                                    programacion.personal_format = personal_arr;
    
                                    if (data_programacion.length == index_programacion + 1) {
    
                                        programacion_model.servicio_emergencia_cantidad(id_operario, pool_cnx, function(msg, row){
    
                                            var response = {
                                                'ws_code' : '0',
                                                'mensaje' : msg, 
                                                'ultimo_servicio_emergencia' : row,
                                                'programaciones' : data_programacion
                                            };
                                            pool_cnx.release();
                                            pool.end();
                                            res.json(response);
                                        });
                                    }
                                });
    
                            } else {
                                programacion.personal_format = personal_arr;
    
                                if (data_programacion.length == index_programacion + 1) {
    
                                    programacion_model.servicio_emergencia_cantidad(id_operario, pool_cnx, function(msg, row){
    
                                        var response = {
                                            'ws_code' : '0',
                                            'mensaje' : msg, 
                                            'ultimo_servicio_emergencia' : row,
                                            'programaciones' : data_programacion
                                        };
                                        pool_cnx.release();
                                        pool.end();
                                        res.json(response);
                                    });
                                }
                            }
                        });
                    });
                } else {
    
                    programacion_model.servicio_emergencia_cantidad(id_operario, pool_cnx, function(msg, row){
    
                        var response = {
                            'ws_code' : '0',
                            'mensaje' : msg, 
                            'ultimo_servicio_emergencia' : row,
                            'programaciones' : data_programacion
                        };
                        pool_cnx.release();
                        pool.end();
                        res.json(response);
                    });
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