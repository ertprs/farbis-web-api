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

    lista_por_operario_fecha : function(id_operario, fecha, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_programacion_lista_por_operario_fecha(?,?)', [ id_operario, fecha ], function(err, rows, fields)
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
                telefonos, logo, geolatitud, geolongitud, servicio, area_trabajar, coordino, celular_coordino, secordino,
                celular_secordino, atendera, celular_atendera, personal, producto, personal_encargado, correo, nombre_vendedor,
                celular_vendedor, nombre_programadora1, celular_programadora1, nombre_programadora2, 
                celular_programadora2, nombre_programadora3, celular_programadora3, servicio_emergencia, id_usuario, 
                callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_programacion_registro(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,@output,@id);select @output,@id', 
                [ id_programacion, id_empresa, fecha, nro_orden, cliente, giro_comercial, direccion, referencia,
                telefonos, logo, geolatitud, geolongitud, servicio, area_trabajar, coordino, celular_coordino, secordino, 
                celular_secordino, atendera, celular_atendera, personal, producto, personal_encargado, correo, nombre_vendedor,
                celular_vendedor, nombre_programadora1, celular_programadora1, nombre_programadora2, 
                celular_programadora2, nombre_programadora3, celular_programadora3, servicio_emergencia, id_usuario ], 
                function(err, rows, fields)
        {
            var data = null;
            var msg = '';
            var id = '';
            
            if (err) {
                msg = err.message;
            }else{
                msg = functions.get_output(rows, '@output');
                id = functions.get_output(rows, '@id');
            }

            callback(msg, data, id);
        });

        cnx.end(function () {});
    },

    registro_multiple : function(programaciones, 
                callback) {
        var cnx = connection.get_connection();
        //console.log(programaciones);
        let stmt = 'INSERT INTO  ope_programacion (IdProgramacion, IdEmpresa, Fecha, NroOrden, Cliente, GiroComercial, ';
        stmt += 'Direccion, Referencia, Telefonos, Logo, GeoLatitud, GeoLongitud, Servicio, AreaTrabajar, Coordino, CelularCoordino, ';
        stmt += 'SeCordino, TelefonoCelularSeCordino, Atendera, CelularAtendera, Personal, Producto, PersonalEncargado, ';
        stmt += 'Estado, FlgEnvioFoto, FlgEnvioAudio, FlgEnvioVideo, ServicioPendiente, ';
        stmt += 'CambioDeProgramacion, Correo, NombreVendedor, TelefonoCelularVendedor, NombreProgramadora1,';
        stmt += 'TelefonoCelularProgramadora1, NombreProgramadora2, TelefonoCelularProgramadora2,';
        stmt += 'NombreProgramadora3, TelefonoCelularProgramadora3, ServicioCancelado, ServicioEmergencia, ';
        stmt += 'IdUsuario, FechaRegistro, Descargado) ';
        stmt += 'VALUES   ?  ';

        cnx.query(stmt, [ programaciones ], function(err, rows, fields)
        {
            var data = null;
            var msg = '';
            var id = '';
            //console.log(err);
            //console.log(rows);
            //console.log(fields);
            if (err) {
                msg = err.message;
            }else{
                //msg = functions.get_output(rows, '@output');
                //id = functions.get_output(rows, '@id');
                msg = 'OK';
                id = '';
            }

            callback(msg, data, id);
        });
        
        cnx.end(function () {});
    },

    valida_multiple : function(ids, callback) {

        var cnx = connection.get_connection();

        let stmt = 'SELECT idprogramacion as id_programacion FROM ope_programacion where idprogramacion in  ' + ids + ';';
        //console.log(stmt);

        cnx.query(stmt, [  ], function(err, rows, fields)
        {
            var data = null;
            var msg = '';
            var id = '';

            if (err) {
                msg = err.message;
            }else{
                //msg = functions.get_output(rows, '@output');
                //id = functions.get_output(rows, '@id');
                //console.log(rows);
                data = functions.get_datarow(rows);
                //data = functions.get_datatable(rows);
                if (data == null) {
                    data = [];
                }
                //console.log(data);
                msg = 'OK';
                id = '';
            }

            callback(msg, data, id);
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

    obtiene_personal : function(id_programacion, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_programacion_obtiene_personal(?)', [ id_programacion ], function(err, rows, fields)
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

    lista_sin_descargar : function(callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_programacion_lista_sin_descargar()', [  ], function(err, rows, fields)
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

    actualiza_descargado : function(id_programacion, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_programacion_actualiza_descargado(?)', [ id_programacion ], function(err, rows, fields)
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

    obtener : function(id_programacion, callback) {

        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_programacion_obtener(?)', [ id_programacion ], function(err, rows, fields)
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
