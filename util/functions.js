
class functions {

    static get_datatable(rows) {

        var data = {};
        
        data = rows[0];

        if (data == undefined) {
            data = null;
            //console.log(data);
        } else {
            //msg = rows[0];
        }

        return data;
    }

    static get_datarow(rows) {

        var data = {};
        
        data = rows[0][0];

        if (data == undefined) {
            data = null;
            //console.log(data);
        } else {
            //msg = rows[0];
        }

        return data;
    }

    static get_datavalue(rows) {

        var data = {};
        
        data = rows[0][0];

        if (data == undefined) {
            data = null;
            //console.log(data);
        } else {
            //msg = rows[0];
        }

        return data['valor'];
    }

    static get_msg(rows) {

        var msg = "OK";
        
        if (rows.length > 2) {
            msg = rows[2];
            msg = msg[0];
            msg = msg['@output'];

            if (msg == "" || msg == null) {
                msg = "OK";
            }

        } else {
            //msg = rows[0];
        }

        return msg;
    }

    static get_output(rows, fieldname) {

        var msg = "OK";
        var output = "";

        if (rows.length > 2) {
            msg = rows[2];
            msg = msg[0];
            
            output = msg[fieldname];

            if (msg == "" || msg == null) {
                msg = "OK";
            }
            
        } else if (rows.length > 1) {
            msg = rows[1];
            msg = msg[0];
            
            output = msg[fieldname];

            if (msg == "" || msg == null) {
                msg = "OK";
            }
            
        } else {
            //msg = rows[0];
        }

        if (output == '')
        {
            output = "OK";
        }

        return output;
    }

    static string_todate(_date, _format, _delimiter)
    {
        var format_lowercase = _format.toLowerCase();
        var format_items = format_lowercase.split(_delimiter);
        var date_items = _date.split(_delimiter);
        var month_index = format_items.indexOf("mm");
        var day_index = format_items.indexOf("dd");
        var year_index = format_items.indexOf("yyyy");
        var month = parseInt(date_items[month_index]);
        month -= 1;
        var formated_date = new Date(date_items[year_index],month,date_items[day_index]);
        
        return formated_date;
    }

    static string_todatetime(_date, _format, _delimiter)
    {
        var time = _date.substring(11, 19);
        _date = _date.substring(0, 10);
        
        var format_lowercase = _format.toLowerCase();
        var format_items = format_lowercase.split(_delimiter);
        var date_items = _date.split(_delimiter);
        var month_index = format_items.indexOf("mm");
        var day_index = format_items.indexOf("dd");
        var year_index = format_items.indexOf("yyyy");
        var month = parseInt(date_items[month_index]);
        
        var date = date_items[year_index]+"/"+month+"/"+date_items[day_index];

        month -= 1;
        var formated_date = new Date(date+" "+time);
        
        return formated_date;
    }

    static date_tostring(_date, _format, _delimiter)
    {
        var date_string = _date.toISOString().
                replace(/T/, ' ').      // replace T with a space
                replace(/\..+/, '');
        
        return date_string;
    }

    static print_console(message) {

        console.log('farbis msg: ' + message);
    }

    //function will check if a directory exists, and create it if it doesn't
    static check_directory(directory, callback) {  

        var fs = require('fs');

        fs.stat(directory, function(err, stats) {
            //Check if error defined and the error code is "not exists"
            if (err && (err.errno === 34 || err.errno === -2)) {
                //Create the directory, call the callback.
                fs.mkdir(directory, callback);
            } else {
                //just in case there was a different error:
                callback(err)
            }
        });
    }

    static send_push_notification(token, title, body, callback) {

        var gcm = require('node-gcm');

        // Set up the sender with your GCM/FCM API key (declare this once for multiple messages) 
        var API = 'AIzaSyDSUtsd_rPy-gMwjnufu4Lg1jZb2JAOKVs';
        
        // Create a message 
        var message = new gcm.Message({
            priority: 'normal',
            data: {
                titulo: title,
                mensaje: body
            },
            notification: {
                title: title, //title
                icon: "ic_launcher",
                body: body,
                sound: "default",
                badge: "1"
            }
        });

        // Set up the sender with you API key 
        var sender = new gcm.Sender(API);

        // Add the registration tokens of the devices you want to send to 
        var registrationTokens = [ token ];

        // Send the message 
        sender.send(message, { registrationTokens: registrationTokens }, function (err, response) {

            var msg = '';
            if (err) {
                msg = err;
                console.error(err);
            } else {
                msg = response;
                console.log(response);
            }
                
            callback(msg);
        });
    }


}

module.exports = functions;