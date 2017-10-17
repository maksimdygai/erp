'use strict';

const requestToISimple = require('../middleware/isimple/request/request.js');
const CONFIG = require('../config/config.js');

exports.register = function(server, options, next) {
    server.route([
        {
            method: 'GET',
            path: '/api/v1/msg/mail/outcome',
            handler: function (request, reply) {
                let params = {
                    path: `/rest/corp/document/fordates_filter`,
                    method: 'POST',
                    postData: {
                        docModule: 'ibankul',
                        docType: 'mail2bank',
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
        {
            method: 'POST',
            path: '/api/v1/msg/mail/outcome',
            handler: function (request, reply) {
                const payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;
                let params = {
                    path: `/rest/corp/document/fordates_filter`,
                    method: 'POST',
                    postData: {
                        docModule: 'ibankul',
                        docType: 'mail2bank',
                        dateFrom: payload.filter.from && payload.filter.from.length === 10
                            ? payload.filter.from.replace(/^(\d+).(\d+).(\d+)$/, '$3$2$1')
                            : '',
                        dateTo: payload.filter.to && payload.filter.to.length === 10
                            ? payload.filter.to.replace(/^(\d+).(\d+).(\d+)$/, '$3$2$1')
                            : '',
                        filter: payload.filter.theme && payload.filter.theme.length > 0
                            ? `caption like '%${payload.filter.theme}%'`
                            : '',
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
        {
            method: 'POST',
            path: '/api/v1/msg/mail/income',
            handler: function (request, reply) {
                const payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;
                let params = {
                    path: `/rest/corp/document/fordates_filter`,
                    method: 'POST',
                    postData: {
                        docModule: 'ibankul',
                        docType: 'mail2client',
                        dateFrom: payload.filter.from && payload.filter.from.length === 10
                            ? payload.filter.from.replace(/^(\d+).(\d+).(\d+)$/, '$3$2$1')
                            : '',
                        dateTo: payload.filter.to && payload.filter.to.length === 10
                            ? payload.filter.to.replace(/^(\d+).(\d+).(\d+)$/, '$3$2$1')
                            : '',
                        filter: payload.filter.theme && payload.filter.theme.length > 0
                            ? `caption like '%${payload.filter.theme}%'`
                            : '',
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
        {
            method: 'POST',
            path: '/api/v1/msg/mail/create',
            handler: function (request, reply) {
                const payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;
                console.log(payload);
                let params = {
                    path: `/rest/corp/mail2bank`,
                    method: 'POST',
                    postData: {
                        id: payload.id,
                        caption: payload.caption,
                        description: payload.description,
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
        {
            method: 'POST',
            path: '/api/v1/msg/mail/attachment/delete',
            handler: function (request, reply) {
                const payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;
                let params = {
                    path: `/rest/corp/mail2bank/${payload.id}/attachment/${payload.attachmentId}`,
                    method: 'DELETE',
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
            path: '/api/v1/msg/mail/attachment/{mailId}/{id}/{name}',
            handler: function (request, reply) {
                let params = {
                    path: `/rest/corp/mail2bank/${request.params.mailId}/attachment/${request.params.id}`,
                    method: 'GET',
                    binary: true,
                };
                params = Object.assign(params, request.auth);

                requestToISimple(params)
                .then((res) => {
                    console.log(res.headers);
                    reply(res.result).bytes(res.result.length).code(res.statusCode).type(request.query.type);
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
    name: 'msg'
};
