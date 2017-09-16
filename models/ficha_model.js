var connection = require('.././database/connection');
var functions = require('.././util/functions');

module.exports = {

    registro : function(id_programacion, numero, fecha_llegada, foto_llegada,
                        fecha_inicio, foto_inicio, fecha_fin, fecha_salida, diagnostico_codigo,
                        diagnostico_nombre, diagnostico_foto, condicion_sanitaria_codigo, 
                        condicion_sanitaria_nombre, trabajo_realizado_codigo, trabajo_realizado_nombre,
                        ficha_fisica_foto, flg_envio_foto, flg_envio_audio, flg_envio_video,
                        es_descargado, id_usuario, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_ficha_registro(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 
                [ id_programacion, numero, fecha_llegada, foto_llegada,
                fecha_inicio, foto_inicio, fecha_fin, fecha_salida, diagnostico_codigo,
                diagnostico_nombre, diagnostico_foto, condicion_sanitaria_codigo, 
                condicion_sanitaria_nombre, trabajo_realizado_codigo, trabajo_realizado_nombre,
                ficha_fisica_foto, flg_envio_foto, flg_envio_audio, flg_envio_video,
                es_descargado, id_usuario ], function(err, rows, fields)
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

    lista_por_programacion : function(id_programacion, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_ficha_lista_por_programacion(?)', [ id_programacion ], function(err, rows, fields)
        {
            var data = null;
            var msg = '';
            
            if (err) {
                msg = err.message;
            }else{
                data = functions.get_datarow(rows);
                msg = functions.get_msg(rows);
            }
            
            callback(msg, data);
        });

        cnx.end(function () {});
    },

};
