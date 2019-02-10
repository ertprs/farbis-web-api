var connection = require('.././database/connection');
var functions = require('.././util/functions');

module.exports = {

    registro : function(id_vehiculo, tipo, personal, fecha, ruta_foto, geo_latitud, geo_longitud, id_usuario, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_adm_vehiculo_movimiento_registro(?,?,?,?,?,?,?,?);select @output', [ id_vehiculo, 
            tipo, personal, fecha, ruta_foto, geo_latitud, geo_longitud, id_usuario ], function(err, rows, fields)
        {
            var data = null;
            var msg = '';

            if (err) {
                msg = err.message;
            }else{
                msg = functions.get_output(rows, '@output');
            }

            callback(msg, data, item, fecha);
        });

        cnx.end(function () {});
    },

    actualiza : function(id_vehiculo_movimiento, id_vehiculo, tipo, personal, fecha, ruta_foto, 
                        geo_latitud, geo_longitud, id_usuario, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_adm_vehiculo_movimiento_actualiza(?,?,?,?,?,?,?,?,?);select @output', [ id_vehiculo_movimiento,
            id_vehiculo, tipo, personal, fecha, ruta_foto, geo_latitud, geo_longitud, id_usuario ], function(err, rows, fields)
        {
            var data = null;
            var msg = '';

            if (err) {
                msg = err.message;
            }else{
                msg = functions.get_output(rows, '@output');
            }

            callback(msg, data, item, fecha);
        });

        cnx.end(function () {});
    },

    elimina : function(id_vehiculo_movimiento, id_usuario, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_adm_vehiculo_movimiento_elimina(?,?);select @output', [ id_vehiculo_movimiento,
            id_usuario ], function(err, rows, fields)
        {
            var data = null;
            var msg = '';

            if (err) {
                msg = err.message;
            }else{
                msg = functions.get_output(rows, '@output');
            }

            callback(msg, data, item, fecha);
        });

        cnx.end(function () {});
    },

};
