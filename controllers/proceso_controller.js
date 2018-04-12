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
        /*
        if (fecha_vcto == '') {
            fecha_vcto = null;
        }
        else{
            fecha_vcto = functions.string_todate(fecha_vcto, 'dd/MM/yyyy', '/');
        }
        */
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
        /*
        if (fecha_vcto == '') {
            fecha_vcto = null;
        }
        else{
            fecha_vcto = functions.string_todate(fecha_vcto, 'dd/MM/yyyy', '/');
        }
        */
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

    post_archivos_guarda : function(req, res, next)
    {
        functions.print_console('rest method proceso: post_archivos_guarda');

        var id_programacion = req.body.id_programacion;
        var nro_orden = req.body.nro_orden;
        var anio = req.body.anio;
        var tipo = req.body.tipo;
        var item = req.body.item;
        
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
                        var path_archivo= full_address + '/' + ruta_archivo.replace('public/', '');
                        var ruta_foto = '';
                        var ruta_audio = '';
                        var ruta_video = '';

                        if (ruta_archivo.indexOf(".jpg") > -1) {
                            ruta_foto = path_archivo;
                        }
                        if (ruta_archivo.indexOf(".png") > -1) {
                            ruta_foto = path_archivo;
                        }
                        if (ruta_archivo.indexOf(".wma") > -1) {
                            ruta_audio = path_archivo;
                        }
                        if (ruta_archivo.indexOf(".mp3") > -1) {
                            ruta_audio = path_archivo;
                        }
                        if (ruta_archivo.indexOf(".wmv") > -1) {
                            ruta_video = path_archivo;
                        }
                        if (ruta_archivo.indexOf(".mp4") > -1) {
                            ruta_video = path_archivo;
                        }

                        // Actualizamos el registro
                        proceso_model.actualiza_archivos(id_programacion, tipo, item, ruta_foto, 
                            ruta_audio, ruta_video, function(msg, data){
                
                            var response = {
                                'ws_code' : '0',
                                'mensaje' : mensaje,
                                'ruta_archivo' : path_archivo,
                                'tipo' : tipo,
                                'item' : item,
                                'ruta_foto' : ruta_foto,
                                'ruta_audio' : ruta_audio,
                                'ruta_video' : ruta_video
                            };
        
                            res.json(response);
                        });
                        /*
                        var response = {
                            'ws_code' : '0',
                            'mensaje' : mensaje,
                            'ruta_archivo' : full_address + '/' + ruta_archivo.replace('public/', '')
                        };

                        res.json(response);
                        */
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
};