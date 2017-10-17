'use strict';

const requestToISimple = require('../middleware/isimple/request/request.js');
const CONFIG = require('../config/config.js');

exports.register = function(server, options, next) {
    server.route([
        {
            method: 'GET',
            path: '/api/v1/ministatement/outcome/{status}',
            handler: function (request, reply) {
                const path = `/rest/corp/rosevro/last_documents/doc_types?number_of_entries=10&list_of_statuses=${request.params.status}`
                let params = {
                    path: path,
                    method: 'POST',
                    postData: {
                        "docTypes": [
                            {
                                "docModule":"ibankul",
                                "docType":"doc_platpor"
                            }
                        ],
                        includeClarify: true,
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
            method: 'GET',
            path: '/api/v1/ministatement_new_info',
            handler: function (request, reply) {
                const path = `/rest/corp/last_documents/doc_types?number_of_entries=20`
                let params = {
                    path: path,
                    method: 'POST',
                    postData: {
                        "docTypes": [
                            {
                                "docModule":"ibankul",
                                "docType":"doc_platpor"
                            }
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
        {
            method: 'POST',
            path: '/api/v1/ministatement/outcome/getbyid',
            handler: function (request, reply) {
                const ids = JSON.parse(request.payload).map(el => el.document.id).join(';');

                let params = {
                    path: `/rest/corp/rosevro/document/byid?doc_module=ibankul&doc_type=doc_platpor&doc_ids=${ids}&include_clarify=true`,
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
            path: '/api/v1/ministatement/outcome/documents',
            handler: function (request, reply) {
                const payload = JSON.parse(request.payload);

                let params = {
                    path: `/rest/corp/rosevro/document/fordates_filter`,
                    method: 'POST',
                    postData: {
                        docModule: 'ibankul',
                        docType: 'doc_platpor',
                        filter: `status="'${payload.status}'`,
                        includeClarify: true,
                    }
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
            path: '/api/v1/ministatement/income',
            handler: function (request, reply) {
                const payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;
                let path = `/rest/corp/rosevro/credit_operations?count=10&account=${payload.accounts.join('&account=')}`;
                console.log(path);
                let params = {
                    path: path,
                    method: 'GET',
                };
                params = Object.assign(params, request.auth);

                requestToISimple(params)
                .then((res) => {
                    console.log(res.result);
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
    name: 'ministatement'
};
