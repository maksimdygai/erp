'use strict';

exports.register = function(server, options, next) {
    server.route([
        {
            method: '*',
            path: '/{p*}',
            handler: function (request, reply) {
                reply.view('index');
            }
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'client'
};
