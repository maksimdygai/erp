'use strict';

exports.register = function(server, options, next) {
    server.route([
        {
            method: '*',
            path: '/img/{p*}',
            handler: {
                directory: {
                    path: __dirname + '/../../public/img'
                }
            }
        },
        {
            method: '*',
            path: '/fonts/{p*}',
            handler: {
                directory: {
                    path: __dirname + '/../../public/fonts'
                }
            }
        },
        {
            method: '*',
            path: '/public/{p*}',
            handler: {
                directory: {
                    path: __dirname + '/../../public'
                }
            }
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'static files'
};
