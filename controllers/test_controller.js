var test_model = require('.././models/test_model');

module.exports = {

    /**
     * REST
     */

    post_test : function(req, res, next)
    {
        functions.print_console('rest method ficha: post_registro');

        var numero = req.body.numero;

        test_model.test(numero, function(msg, data){

            var response = {
                'ws_code' : '0',
                'mensaje' : msg
            };

            res.json(response);
        });
    },

};