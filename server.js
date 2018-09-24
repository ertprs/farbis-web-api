var express = require('express');
var mysql = require('mysql');
var bodyparser = require('body-parser');

var routes = require('./routes/routes');
var functions = require('./util/functions');

var app = express();
var server = require('http').Server(app);
//var io = require('socket.io')(server);
var port = process.env.PORT || 80;
//var port = process.env.PORT || 5000;
var path = require('path');

var engine = require('ejs');
var upload = require('express-fileupload');

process.env.TZ = 'America/Lima';

app.set('port', port);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
//app.use(express.static(__dirname + '/public'));

//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'views')));

//  Serve frontend view
app.use(express.static('public'));

app.use(upload());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use('/', routes);
app.use(routes);

/*
app.use(function(req, res, next)
{
    var response = {
        'ws_code' : '0',
        'mensaje' : 'Archivo no encontrado'
    };

    res.json(response);
});
*/

server.listen(port, function(){

    functions.print_console('server running in port number: ' + port);
});

var connection = require('./database/connection');

connection.test();

var cors = require("cors");
app.use(cors({
    origin: true,
    credentials: true
}));