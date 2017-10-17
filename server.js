'use strict';

const Hapi = require('hapi');
const path = require('path');
const aes256 = require('aes256');
const CONFIG = require('./server/config/config.js');

var httpRequest;

const server = new Hapi.Server();
server.connection(
    {
        port: 8000
    }
);

server.ext('onPreHandler', function(request, reply) {
    const user = request.yar.get('user');
    if (user) {
        request.auth = {
            username: user.username,
            password: aes256.decrypt(CONFIG.session.passwordForPassField, user.password),
        };
    }
    return reply.continue();
});

server.register([
    {
        register: require('vision')
    },
    {
        register: require('inert')
    },
    {
        register: require('yar'),
        options: {
            storeBlank: false,
            cookieOptions: {
                /*password: CONFIG.session.passwordForCookie,*/
                isSecure: false
            }
        }
    },
    {
        register: require('scooter')
    },
    {
        register: require('./server/routes/static.js')
    },
    {
        register: require('./server/routes/client.js')
    },
    {
        register: require('./server/routes/products.js')
    },
], function() {
    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: path.resolve(__dirname, 'server'),
        path: 'templates'
    });

    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});
