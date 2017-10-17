'use strict';

const requestToISimple = require('../middleware/isimple/request/request.js');
const CONFIG = require('../config/config.js');

exports.register = function(server, options, next) {
    server.route([
        {
            method: 'GET',
            path: '/api/v1/contragent/list',
            handler: function (request, reply) {
                let params = {
                    path: '/rest/corp/dic/corr',
                    method: 'GET',
                };
                params = Object.assign(params, request.auth);

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
            method: 'POST',
            path: '/api/v1/contragent/create',
            handler: function (request, reply) {
                const payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;
                let params = {
                    path: '/rest/corp/dic/corr',
                    method: 'POST',
                    postData: {
                        id: payload.id ? payload.id : '',
                        corrType: 'UL',
                        description: payload['contragent-description'],
                        fullname: payload.contragent,
                        inn: payload.inn,
                        kpp: payload.kpp,
                        accList: [
                            {
                                id: payload['payment-id'] ? payload['payment-id'] : '',
                                accNumber: payload.account,
                                bankBik: payload.bik,
                                accDescription: payload['payment-description'],
                            },
                        ],
                    },
                };
                params = Object.assign(params, request.auth);

                requestToISimple(params)
                .then((res) => {
                    reply(res.result).code(res.statusCode).type('application/json');
                })
                .catch((rej) => {
                    reply(rej.toString());
                });
            }
        },
    ]);

    next();
};

exports.register.attributes = {
    name: 'contragent'
};
