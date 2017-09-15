var connection = require('.././database/connection');
var functions = require('.././util/functions');

module.exports = {

    lista_por_operario : function(id_operario, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_programacion_lista_por_operario(?)', [ id_operario ], function(err, rows, fields)
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

    actualiza_estado : function(id_programacion, estado, hora, latitud, longitud, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_programacion_actualiza_estado(?,?,?,?,?)', [ id_programacion, estado, hora, latitud, longitud ], function(err, rows, fields)
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

    registro : function(id_programacion, id_empresa, fecha, nro_orden, cliente, giro_comercial, direccion, referencia,
                telefonos, logo, geolatitud, geolongitud, servicio, area_trabajar, coordino, secordino,
                celular_secordino, atendera, personal, producto, personal_encargado, correo, nombre_vendedor,
                celular_vendedor, nombre_programadora1, celular_programadora1, nombre_programadora2, 
                celular_programadora2, nombre_programadora3, celular_programadora3, servicio_emergencia, id_usuario, 
                callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_programacion_registro(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@output);select @output', 
                [ id_programacion, id_empresa, fecha, nro_orden, cliente, giro_comercial, direccion, referencia,
                telefonos, logo, geolatitud, geolongitud, servicio, area_trabajar, coordino, secordino, 
                celular_secordino, atendera, personal, producto, personal_encargado, correo, nombre_vendedor,
                celular_vendedor, nombre_programadora1, celular_programadora1, nombre_programadora2, 
                celular_programadora2, nombre_programadora3, celular_programadora3, servicio_emergencia, id_usuario ], 
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

    cambio : function(id_programacion, cambio_programacion, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_programacion_cambio(?,?)', [ id_programacion, cambio_programacion ], function(err, rows, fields)
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

    lista_sin_operario : function(callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_programacion_lista_sin_operario()', [  ], function(err, rows, fields)
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

    actualiza_operario : function(id_programacion, id_operario, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_programacion_actualiza_operario(?,?)', [ id_programacion, id_operario ], function(err, rows, fields)
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

    elimina_historial : function(id_operario, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_programacion_elimina_historial(?)', [ id_operario ], function(err, rows, fields)
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

    servicio_emergencia_cantidad : function(id_usuario, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_programacion_servicio_emergencia_cantidad(?)', [ id_usuario ], function(err, rows, fields)
        {
            var data = null;
            var msg = '';
            
            if (err) {
                msg = err.message;
            }else{
                data = functions.get_datavalue(rows);
                msg = functions.get_msg(rows);
            }

            callback(msg, data);
        });

        cnx.end(function () {});
    },
};
