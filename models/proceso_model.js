var connection = require('.././database/connection');
var functions = require('.././util/functions');

module.exports = {

    lista_por_programacion : function(id_programacion, tipo, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_proceso_lista_por_programacion(?,?)', [ id_programacion, tipo ], function(err, rows, fields)
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

    registro : function(id_programacion, tipo, descripcion, nombre, telefono, area, 
                        fecha_vcto, ruta_foto, ruta_audio, ruta_video, id_usuario, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_proceso_registro(?,?,?,?,?,?,?,?,?,?,?,@item,@fecha);select @item,@fecha', [ id_programacion, tipo, descripcion,
	                    nombre, telefono, area, fecha_vcto, ruta_foto, ruta_audio, 
                        ruta_video, id_usuario ], function(err, rows, fields)
        {
            var data = null;
            var msg = '';
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

        cnx.end(function () {});
    },

    actualiza : function(id_programacion, tipo, item, descripcion, nombre, telefono, area, 
                        fecha_vcto, ruta_foto, ruta_audio, ruta_video, id_usuario, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_proceso_actualiza(?,?,?,?,?,?,?,?,?,?,?,?)', [ id_programacion, 
                        tipo, item, descripcion, nombre, telefono, area, 
                        fecha_vcto, ruta_foto, ruta_audio, ruta_video, id_usuario ], function(err, rows, fields)
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

    confirma : function(id_programacion, tipo, item, id_usuario, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_proceso_confirma(?,?,?,?)', [ id_programacion, tipo, item, id_usuario ], 
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
