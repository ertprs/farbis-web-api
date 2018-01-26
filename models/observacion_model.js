var connection = require('.././database/connection');
var functions = require('.././util/functions');

module.exports = {

    lista_por_operario : function(id_programacion, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_observacion_lista_por_programacion(?)', [ id_programacion ], function(err, rows, fields)
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

    registro : function(id_programacion, observacion, origen, 
                        ruta_foto, ruta_audio, id_usuario, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_observacion_registro(?,?,?,?,?,?,@item,@fecha);select @item,@fecha', [ id_programacion, 
                    observacion, origen, ruta_foto, ruta_audio, id_usuario ], function(err, rows, fields)
        {
            var data = null;
            var msg = '';
            var item = '';
            var fecha = '';
            
            if (err) {
                msg = err.message;
            }else{
                msg = functions.get_msg(rows);
                item = functions.get_output(rows, '@item');
                fecha = functions.get_output(rows, '@fecha');
            }

            callback(msg, data, item, fecha);
        });
        cnx.release();
        cnx.end(function () {});
    },

    actualiza : function(id_programacion, item, observacion,  
                        ruta_foto, ruta_audio, id_usuario, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_observacion_actualiza(?,?,?,?,?,?)', [ id_programacion, item, observacion,  
                    ruta_foto, ruta_audio, id_usuario ], function(err, rows, fields)
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

    elimina : function(id_programacion, item, id_usuario, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_observacion_elimina(?,?,?)', [ id_programacion, item, id_usuario ], 
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
