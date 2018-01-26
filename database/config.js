var functions = require('.././util/functions');

var env = process.env.NODE_ENV || 'developer';
var config = {};
 
functions.print_console('database env: '+env);

if (env == 'developer')
{
    //con = 'mongodb://localhost:27017/appacademia';
    //con = 'mongodb://jcarlosverase:jcarlosverase@ds139288.mlab.com:39288/appacademia';
    config = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'farbis',
        connectionLimit: 100,
        queueLimit: 0,
        waitForConnection: true,
        multipleStatements: true
    };
}
/*
else if (env == 'qa')
{
    config = {
        host: 'us-cdbr-iron-east-03.cleardb.net',
        user: 'b89206080851c4',
        password: '5f53ac66',
        database: 'heroku_d4803c8e7292f37',
        connectionLimit: 50,
        queueLimit: 0,
        waitForConnection: true,
        multipleStatements: true
    };
}
*/
else if (env == 'qa')
{
    config = {
        host: 'us-cdbr-iron-east-05.cleardb.net',
        user: 'bb6c696855162d',
        password: '638896cc',
        database: 'heroku_973be16846cc7c4',
        connectionLimit: 100,
        queueLimit: 0,
        waitForConnection: true,
        multipleStatements: true
    };
}
else
{
    config = {
        host: 'db4free.net',
        user: 'sireis_root',
        password: 'sireis',
        database: 'sireis'
    };
}

module.exports = config;

