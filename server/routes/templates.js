'use strict';

const requestToISimple = require('../middleware/isimple/request/request.js');
const CONFIG = require('../config/config.js');

exports.register = function(server, options, next) {
    server.route([
        {
            method: 'GET',
            path: '/api/v1/templates/list',
            handler: function (request, reply) {
                let params = {
                    path: '/rest/corp/template/list',
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
            method: 'GET',
            path: '/api/v1/templates/get_by_id/{id}',
            handler: function (request, reply) {
                let params = {
                    path: `/rest/corp/template/get_by_id?template_id=${request.params.id}`,
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
            path: '/api/v1/templates/delete',
            handler: function (request, reply) {
                let payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;
                let params = {
                    path: `/rest/corp/template/delete?template_id=${payload.templateId}`,
                    method: 'POST',
                    postData: {},
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
            path: '/api/v1/templates/modify',
            handler: function (request, reply) {
                let payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;
                let params = {
                    path: `/rest/corp/template/modify`,
                    method: 'POST',
                    postData: {
                        id: payload.id,
                        name: payload.name,
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
    name: 'templates'
};
