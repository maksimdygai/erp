'use strict';

const requestToISimple = require('../middleware/isimple/request/request.js');
const CONFIG = require('../config/config.js');

exports.register = function(server, options, next) {
    server.route([
        {
            method: 'GET',
            path: '/api/v1/crypto/certificate',
            handler: function (request, reply) {
                let params = {
                    path: `/rest/corp/crypto/certificate`,
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
            path: '/api/v1/crypto/verify',
            handler: function (request, reply) {
                let payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

                let signedData = Buffer.from(payload.signedData, 'base64');
                let docData = Buffer.from(payload.data, 'base64');
                payload.signedData = Array.from(new Uint8Array(signedData));
                payload.data = Array.from(new Uint8Array(docData));

                let params = {
                    path: `/rest/corp/document/signature/verifyandwrite`,
                    method: 'POST',
                    postData: payload,
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
    name: 'crypto'
};
