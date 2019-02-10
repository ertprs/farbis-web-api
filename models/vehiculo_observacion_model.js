var connection = require('.././database/connection');
var functions = require('.././util/functions');

module.exports = {

    registro : function(id_vehiculo_movimiento, id_vehiculo, personal, item, comentario, 
                        ruta_foto, ruta_audio, ruta_video, id_usuario, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_adm_vehiculo_observacion_registro(?,?,?,?,?,?,?,?,?,@id,@fecha);select @id,@fecha', [ id_vehiculo_movimiento, 
            id_vehiculo, personal, item, comentario, 
            ruta_foto, ruta_audio, ruta_video, id_usuario ], function(err, rows, fields)
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

    actualiza : function(id_vehiculo_observacion, id_vehiculo_movimiento, id_vehiculo, personal, item, comentario, 
        ruta_foto, ruta_audio, ruta_video, id_usuario, callback) {

        var cnx = connection.get_connection();
        console.log(ruta_foto);
        cnx.query('CALL ssp_adm_vehiculo_observacion_actualiza(?,?,?,?,?,?,?,?,?,?)', [ id_vehiculo_observacion, 
            id_vehiculo_movimiento, id_vehiculo, personal, item, comentario, 
            ruta_foto, ruta_audio, ruta_video, id_usuario ], function(err, rows, fields)
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

    elimina : function(id_vehiculo_observacion, id_usuario, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_adm_vehiculo_observacion_elimina(?,?)', [ id_vehiculo_observacion, id_usuario ], 
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
