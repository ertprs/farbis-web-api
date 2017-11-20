var connection = require('.././database/connection');
var functions = require('.././util/functions');

module.exports = {

    registro : function(id_usuario, nombres, apellidos, usuario, contrasenia, 
                        tipo_usuario, color, id_area, usuario_registro, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_adm_usuario_registro(?,?,?,?,?,?,?,?,?,@output);select @output', [ id_usuario, 
            nombres, apellidos, usuario, contrasenia, 
            tipo_usuario, color, id_area, usuario_registro ], function(err, rows, fields)
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

    actualiza : function(id_usuario, nombres, apellidos, usuario, contrasenia, 
                        tipo_usuario, color, id_area, usuario_registro, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_adm_usuario_actualiza(?,?,?,?,?,?,?,?,?,@output);select @output', [ id_usuario, 
            nombres, apellidos, usuario, contrasenia, 
            tipo_usuario, color, id_area, usuario_registro ], function(err, rows, fields)
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

    elimina : function(id_usuario, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_adm_usuario_elimina(?,@output);select @output', [ id_usuario ], function(err, rows, fields)
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
