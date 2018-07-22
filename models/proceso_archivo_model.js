var connection = require('.././database/connection');
var functions = require('.././util/functions');

module.exports = {

    lista_por_programacion : function(id_programacion, tipo, item, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_proceso_archivo_lista_por_programacion(?,?,?)', [ id_programacion, tipo, item ], function(err, rows, fields)
        {
            var data = null;
            var msg = '';
            
            if (err) {
                msg = err.message;
            }else{
                data = functions.get_datatable(rows);
                msg = functions.get_msg(rows);
            }
            
            callback(msg, data);
        });

        cnx.end(function () {});
    },

    registro : function(id_programacion, tipo, item, descripcion, 
                        ruta_foto, ruta_audio, ruta_video, id_usuario, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_proceso_archivo_registro(?,?,?,?,?,?,?,?,@id,@fecha);select @id,@fecha', [ id_programacion, tipo, item, 
                        descripcion, ruta_foto, ruta_audio, 
                        ruta_video, id_usuario ], function(err, rows, fields)
        {
            var data = null;
            var msg = '';
            var id = '';
            var fecha = '';

            if (err) {
                msg = err.message;
            }else{
                msg = functions.get_msg(rows);
                id = functions.get_output(rows, '@id');
                fecha = functions.get_output(rows, '@fecha');
            }

            callback(msg, data, id, fecha);
        });

        cnx.end(function () {});
    },

    actualiza : function(id_proceso_archivo, ruta_foto, ruta_audio, ruta_video, callback) {

        var cnx = connection.get_connection();
        console.log(ruta_foto);
        cnx.query('CALL ssp_ope_proceso_archivo_actualiza(?,?,?,?)', [ id_proceso_archivo, 
                        ruta_foto, ruta_audio, ruta_video ], function(err, rows, fields)
        {
            var data = null;
            var msg = '';
            
            if (err) {
                msg = err.message;
            }else{
                msg = functions.get_msg(rows);
            }
            console.log(msg);
            callback(msg, data);
        });

        cnx.end(function () {});
    },

    elimina : function(id_proceso_archivo, id_usuario, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_proceso_archivo_elimina(?,?)', [ id_proceso_archivo, id_usuario ], 
                                                                    function(err, rows, fields)
        {
            var data = null;
            var msg = '';
            
            if (err) {
                msg = err.message;
            }else{
                msg = functions.get_msg(rows);
            }

            callback(msg, data);
        });

        cnx.end(function () {});
    },

};
