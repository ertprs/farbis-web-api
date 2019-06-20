var connection = require('.././database/connection');
var functions = require('.././util/functions');

module.exports = {

    registro : function(id_vehiculo, tipo, marca, modelo, color, placa, anio, 
                        fecha_inicio, usuario_registro, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_adm_vehiculo_registro(?,?,?,?,?,?,?,?,?,@output);select @output', [ id_vehiculo, 
            tipo, marca, modelo, color, placa, anio, fecha_inicio, usuario_registro ], function(err, rows, fields)
        {
            var data = null;
            var msg = '';

            if (err) {
                msg = err.message;
            }else{
                msg = functions.get_output(rows, '@output');
            }
            
            callback(msg, data);
        });

        cnx.end(function () {});
    },

    actualiza : function(id_vehiculo, tipo, marca, modelo, color, placa, anio, 
                        fecha_inicio, usuario_registro, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_adm_vehiculo_actualiza(?,?,?,?,?,?,?,?,?,@output);select @output', [ id_vehiculo, 
            tipo, marca, modelo, color, placa, anio, fecha_inicio, usuario_registro ], function(err, rows, fields)
        {
            var data = null;
            var msg = '';

            if (err) {
                msg = err.message;
            }else{
                msg = functions.get_output(rows, '@output');
            }
            
            callback(msg, data);
        });

        cnx.end(function () {});
    },

    elimina : function(id_vehiculo, usuario_registro, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_adm_vehiculo_elimina(?,?,@output);select @output', [ id_vehiculo, usuario_registro ], function(err, rows, fields)
        {
            var data = null;
            var msg = '';

            if (err) {
                msg = err.message;
            }else{
                msg = functions.get_output(rows, '@output');
            }
            
            callback(msg, data);
        });

        cnx.end(function () {});
    },

    lista : function(callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_adm_vehiculo_lista()', [ ], function(err, rows, fields)
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
};
