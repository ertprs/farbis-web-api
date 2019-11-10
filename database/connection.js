var mysql = require('mysql');
var config = require('./config');
var functions = require('.././util/functions');
/*
var db = mysql.createConnection(config);

db.connect(function (error) {

    if (!!error) {
        console.log('Error mysql db.');
    }
    else {
        console.log('Connected to mysql db.');
    }
});

db.end(function () {
    console.log('Disconnected to mysql db.');
});

module.exports = db;
*/
module.exports = {

    test : function()
    {
        var db = mysql.createConnection(config);

        db.connect(function (error) {

            if (!!error) {
                functions.print_console('Error mysql db.');
            }
            else {
                functions.print_console('Connected to mysql db.');
            }
        });

        db.end(function () {
            functions.print_console('Disconnected to mysql db.');
        });
    },

    get_connection : function()
    {
        var db = mysql.createConnection(config);
        /*
        db.connect(function (error) {

            if (!!error) {
                console.log('Error mysql db.');
            }
            else {
                //console.log('Connected to mysql db.');
            }
        });
        */
        return db;
    },

    get_pool : function ()
    {
        var pool = mysql.createPool(config);
        return pool;
    },

    get_pool_connection : function (callback)
    {
        var pool = mysql.createPool(config);
        pool.getConnection(function (err, connection) {
            if (err) {
                console.error('error get_pool_connection: ' + err.stack);
            }
            callback(connection);
        });
    }
    
};