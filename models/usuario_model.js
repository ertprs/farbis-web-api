var connection = require('.././database/connection');
var functions = require('.././util/functions');

module.exports = {

    registro : function(id_usuario, nombres, apellidos, usuario, contrasenia, 
                        tipo_usuario, color, id_area, telefono, usuario_registro, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_adm_usuario_registro(?,?,?,?,?,?,?,?,?,?,@output);select @output', [ id_usuario, 
            nombres, apellidos, usuario, contrasenia, 
            tipo_usuario, color, id_area, telefono, usuario_registro ], function(err, rows, fields)
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
                        tipo_usuario, color, id_area, telefono, usuario_registro, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_adm_usuario_actualiza(?,?,?,?,?,?,?,?,?,?,@output);select @output', [ id_usuario, 
            nombres, apellidos, usuario, contrasenia, 
            tipo_usuario, color, id_area, telefono, usuario_registro ], function(err, rows, fields)
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

    obtiene_por_id_async : function(id_usuario) {

        var cnx = connection.get_connection();

        var query = sync.await(cnx.query('CALL ssp_adm_usuario_obtiene_por_id(?)', [ id_usuario ], sync.defer()));

        cnx.end(function () {});
    },

    obtiene_por_id_multiple : function(ids, callback) {

        var cnx = connection.get_connection();

        let stmt = 'SELECT IdUsuario as id_usuario, Nombres as nombres, Apellidos as apellidos, Telefono as telefono FROM adm_usuario WHERE IdUsuario in  ' + ids + ';';

        cnx.query(stmt, [  ], function(err, rows, fields)
        {
            var data = null;
            var msg = '';
            
            if (err) {
                msg = err.message;
            }else{
                data = rows;
                msg = 'OK';
            }
            
            callback(msg, data);
        });

        cnx.end(function () {});
    },

    obtiene_por_id_multiple : function(ids, pool, callback) {
        var data = null;
        var msg = '';
        let stmt = 'SELECT IdUsuario as id_usuario, Nombres as nombres, Apellidos as apellidos, Telefono as telefono FROM adm_usuario WHERE IdUsuario in  ' + ids + ';';

        if (pool==null) {
            pool = connection.get_pool();
        }
        pool.getConnection(function (err, connection) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                msg = err.stack;
            }
            connection.query(stmt, [ ] , function (err, rows, fields) {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    msg = err.message;
                } else {
                    data = rows;
                    msg = 'OK';
                }
                connection.release();
                callback(msg, data);
            });
        });
    },

    lista_por_tipo : function(tipo, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_adm_usuario_lista_por_tipo(?)', [ tipo ], function(err, rows, fields)
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

    lista : function(callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_adm_usuario_lista()', [ ], function(err, rows, fields)
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

    lista_por_programacion : function(id_programacion, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_adm_usuario_lista_por_programacion(?)', [ id_programacion ], function(err, rows, fields)
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

    lista_token_por_programacion : function(id_programacion, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_adm_usuario_lista_token_por_programacion(?)', [ id_programacion ], function(err, rows, fields)
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
