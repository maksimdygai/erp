'use strict';

const requestToISimple = require('../middleware/isimple/request/request.js');
const CONFIG = require('../config/config.js');

exports.register = function(server, options, next) {
    server.route([
        {
            method: 'POST',
            path: '/api/v1/statement',
            handler: function (request, reply) {
                const payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

                let params = {
                    path: `/rest/corp/account/statement/?account_number=${payload.accountNumber}&date_from=${payload.dateFrom}&date_to=${payload.dateTo}`,
                    method: 'GET',
                };
                console.log(params.path);
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
            path: '/api/v1/statement/offline',
            handler: function (request, reply) {
                const payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;
                let dateFrom = payload.dateFrom.replace(/^(\d+).(\d+).(\d+)$/, '$3-$2-$1');
                let dateTo = payload.dateTo.replace(/^(\d+).(\d+).(\d+)$/, '$3-$2-$1');
                let params = {
                    path: `/rest/corp/statement/offline/ul_get_stmt?acc_id=${payload.accountId}&begin_date=${dateFrom}&end_date=${dateTo}`,
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
            path: '/api/v1/statement/print/{id}',
            handler: function (request, reply) {
                let params = {
                    path: `/rest/corp/print/stm_pdf?doc_ids=${request.params.id}&print_mode=only_stmnt`,
                    method: 'GET',
                    binary: true,
                };
                params = Object.assign(params, request.auth);

                requestToISimple(params)
                .then((res) => {
                    reply(res.result).bytes(res.result.length).code(res.statusCode).type('application/pdf');
                })
                .catch((rej) => {
                    reply(rej.toString());
                });
            }
        },
        {
            method: 'POST',
            path: '/api/v1/statement/export',
            handler: function (request, reply) {
                const payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;
                const beginDate = payload.from.replace(/^(\d+).(\d+).(\d+)$/, '$3-$2-$1');
                const endDate = payload.to.replace(/^(\d+).(\d+).(\d+)$/, '$3-$2-$1');
                let params = {
                    path: `/rest/corp/statement/offline/ul_get_stmt_1c?acc_id=${payload.accId}&begin_date=${beginDate}&end_date=${endDate}`,
                    method: 'GET',
                    binary: true,
                };
                params = Object.assign(params, request.auth);

                requestToISimple(params)
                .then((res) => {
                    reply(res.result).bytes(res.result.length).code(res.statusCode).type('text/html;charset=windows-1251');
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
    name: 'statement'
};
