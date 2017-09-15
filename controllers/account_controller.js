var mysql = require('mysql');
var views = require('.././routes/views');
var config = require('.././database/config');

module.exports = {

    /**
     * WEB
     */
    index : function(req, res, next)
    {
        var db = mysql.createConnection(config);

        db.connect(function(error){

            if (!!error)
            {
                console.log('Error');
            }
            else
            {
                console.log('Connected to mysql db.');
            }
        });

        var programaciones = null;

        db.query('SELECT * FROM ope_programacion', function(err, rows, fields)
        {
            if (err) throw err;

            programaciones = rows;

            db.end();
            
            res.render('programacion/index', { 
                titulo: "Programaciones",
                programaciones: programaciones
             });    
        });
    },
    
    login : function(req, res, next)
    {
        res.render('account/index', { 
            titulo: "Iniciar sesión"
        });
    },

    logout : function(req, res, next)
    {
        res.render('account/index', { 
            titulo: "Iniciar sesión"
        });
    }
};