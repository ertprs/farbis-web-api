var connection = require('.././database/connection');
var functions = require('.././util/functions');

module.exports = {

    test : function(numero, callback) {
        /*
        var cnx = connection.get_connection();

        cnx.query('CALL ssp_ope_proceso_lista_pendientes(?)', [ '0000033493' ], function(err, rows, fields)
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
        */
        var size = numero;
        var pool  = mysql.createPool({
            host: '142.93.77.117',
            user: 'root',
            password: 'abcDEF123',
            database: 'farbisdb'
        });
        for (var i=0; i<size;i++) {
            pool.getConnection(function(err, connection) {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    return;
                }
              connection.query( "SELECT * FROM ope_programacion WHERE IdProgramacion='0000054658';", function(err, rows) {
                if (err) {
                    console.error('error connecting: ' + err.stack);
                    return;
                }
                connection.release();
              });
            });
        }
        callback('msg', 'data');
    },

};
