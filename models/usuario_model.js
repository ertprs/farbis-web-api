var connection = require('.././database/connection');
var functions = require('.././util/functions');

module.exports = {

    registro : function(id_usuario, nombres, usuario, contrasenia, 
                        tipo_usuario, usuario_registro, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_adm_usuario_registro(?,?,?,?,?,?,@output);select @output', [ id_usuario, nombres, usuario, contrasenia, 
                                tipo_usuario, usuario_registro ], function(err, rows, fields)
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

    valida : function(login, tipo, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_adm_usuario_valida(?,?)', [ login, tipo ], function(err, rows, fields)
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

    actualiza_token : function(id_usuario, token, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_adm_usuario_actualiza_token(?,?)', [ id_usuario, token ], function(err, rows, fields)
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

    obtiene_por_id : function(id_usuario, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_adm_usuario_obtiene_por_id(?)', [ id_usuario ], function(err, rows, fields)
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
