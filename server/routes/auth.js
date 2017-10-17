'use strict';

const aes256 = require('aes256');
const crypto = require('crypto');
const scooter = require('scooter');
const requestToISimple = require('../middleware/isimple/request/request.js');
const CONFIG = require('../config/config.js');

exports.register = function(server, options, next) {
    server.route([
        {
            method: 'POST',
            path: '/api/v1/login',
            handler: function (request, reply) {
                let params = {
                    path: '/rest/corp/rosevro/employee',
                    method: 'GET',
                };
                let payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;
                params = Object.assign(params, payload);

                requestToISimple(params)
                .then((res) => {
                    if (res.statusCode === 200) {
                        request.yar.set('user', {
                            username: payload.username,
                            password: aes256.encrypt(CONFIG.session.passwordForPassField, payload.password),
                            useragent: request.plugins.scooter.toJSON(),
                        });
                    }

                    if (res.headers.passwordexpired && res.headers.passwordexpired === 'true') {
                        let _result = {
                            passwordExpired: true
                        };
                        reply(JSON.stringify(_result)).code(res.statusCode).type('application/json');
                    }
                    reply(res.result).code(res.statusCode).type('application/json');
                })
                .catch((rej) => {
                    reply(rej.toString());
                });
            }
        },
        {
            method: 'POST',
            path: '/api/v1/change_password',
            handler: function (request, reply) {
                let payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;
                let params = {
                    path: '/rest/corp/userlogindata/passwd/change/v2',
                    method: 'POST',
                    username: payload.username,
                    password: payload.password,
                    postData: {
                        newHashedPassword: crypto.createHash('md5').update(payload.newPassword).digest('hex'),
                        newHashAlg: "md5",
                    },
                };

                requestToISimple(params)
                .then((res) => {
                    if (res.statusCode === 200) {
                        request.yar.set('user', {
                            username: payload.username,
                            password: aes256.encrypt(CONFIG.session.passwordForPassField, payload.newPassword),
                            useragent: request.plugins.scooter.toJSON(),
                        });
                    }

                    reply(res.result).code(res.statusCode).type('application/json');
                })
                .catch((rej) => {
                    reply(rej.toString());
                });
            }
        },
        {
            method: 'POST',
            path: '/api/v1/logout',
            handler: function (request, reply) {
                request.yar.reset();
                reply(JSON.stringify({status: 'success'})).code(200).type('application/json');
            }
        },
        {
            method: 'GET',
            path: '/api/v1/check_session',
            handler: function (request, reply) {
                if (!request.yar.get('user')) {
                    return reply(JSON.stringify({
                        errorCode: 1,
                    })).code(200).type('application/json');
                }
                return reply(JSON.stringify({
                    errorCode: 0,
                })).code(200).type('application/json');
            }
        },
        {
            method: 'GET',
            path: '/api/v1/user_info',
            handler: function (request, reply) {
                console.log(request.yar);
                const user = request.yar.get('user');

                let params = {
                    path: '/rest/corp/rosevro/employee',
                    method: 'GET',
                    username: user.username,
                    password: aes256.decrypt(CONFIG.session.passwordForPassField, user.password),
                };

                requestToISimple(params)
                .then((res) => {
                    reply(res.result).code(res.statusCode).type('application/json');
                })
                .catch((rej) => {
                    reply(rej.toString());
                });
            }
        },
        {
            method: 'GET',
            path: '/api/v1/org_info',
            handler: function (request, reply) {
                const user = request.yar.get('user');

                let params = {
                    path: '/rest/corp/rosevro/client_ul',
                    method: 'GET',
                    username: user.username,
                    password: aes256.decrypt(CONFIG.session.passwordForPassField, user.password),
                };

                requestToISimple(params)
                .then((res) => {
                    reply(res.result).code(res.statusCode).type('application/json');
                })
                .catch((rej) => {
                    reply(rej.toString());
                });
            }
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'auth'
};
