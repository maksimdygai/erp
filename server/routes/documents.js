'use strict';

const requestToISimple = require('../middleware/isimple/request/request.js');
const CONFIG = require('../config/config.js');

exports.register = function(server, options, next) {
    server.route([
        {
            method: 'POST',
            path: '/api/v1/documents/delete',
            handler: function (request, reply) {
                const payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;
                console.log(payload);
                let params = {
                    path: `/rest/corp/delete/document/${payload.documentId}`,
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
            method: 'POST',
            path: '/api/v1/documents/copy',
            handler: function (request, reply) {
                const payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;
                let params = {
                    path: `/rest/corp/copy/document/${payload.documentId}`,
                    method: 'POST',
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
            path: '/api/v1/documents/data',
            handler: function (request, reply) {
                const payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;
                let params = {
                    path: `/rest/corp/document/signature/data?doc_module=${payload.docModule}&doc_type=${payload.docType}&doc_id=${payload.docId}&lib_id=${payload.libId}`,
                    method: 'GET',
                    binary: true,
                    inBase64: true,
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
            path: '/api/v1/documents/send2bank',
            handler: function (request, reply) {
                const payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;
                let params = {
                    path: `/rest/corp/document/send?doc_module=${payload.docModule}&doc_type=${payload.docType}&doc_ids=${payload.docId}`,
                    method: 'PUT',
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
            path: '/api/v1/documents/create_template',
            handler: function (request, reply) {
                const payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;
                let params = {
                    path: `/rest/corp/template/create_by_id?document_id=${payload.docId}`,
                    method: 'POST',
                    postData: {
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
        {
            method: 'GET',
            path: '/api/v1/documents/get_pdf/{docId}',
            handler: function (request, reply) {
                let params = {
                    path: `/rest/corp/print/pdf?doc_ids=${request.params.docId}`,
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
            path: '/api/v1/documents/set_viewed',
            handler: function (request, reply) {
                const payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;
                let params = {
                    path: `/rest/corp/rosevro/doc/${payload.docId}/set_viewed`,
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
            path: '/api/v1/documents/attachment',
            config: {
                payload: {
                    output: 'stream',
                    parse: true,
                    maxBytes: '20971520'//20 MB
                }
            },
            handler: function (request, reply) {
                let data = [];

                request.payload.file.on('data', chunk => {
                    data.push(chunk);
                });

                request.payload.file.on('end', () => {
                    let buf = Buffer.concat(data);
                    let params = {
                        path: `/rest/corp/attachment`,
                        method: 'POST',
                        postData: {
                            id: request.payload.id,
                            file: {
                                value: buf,
                                options: {
                                    filename: request.payload.file.hapi.filename,
                                    contentType: request.payload.file.hapi.headers['content-type'],
                                }
                            }
                        },
                        multipart: true,
                    };
                    params = Object.assign(params, request.auth);

                    requestToISimple(params)
                    .then((res) => {
                        reply(res.result).code(res.statusCode).type('application/json');
                    })
                    .catch((rej) => {
                        reply(rej.toString());
                    });
                });
            }
        },
        {
            method: 'POST',
            path: '/api/v1/documents/attachment/mail2bank',
            config: {
                payload: {
                    output: 'stream',
                    parse: true,
                    maxBytes: '20971520'//20 MB
                }
            },
            handler: function (request, reply) {
                let data = [];

                request.payload.file.on('data', chunk => {
                    data.push(chunk);
                });

                request.payload.file.on('end', () => {
                    let buf = Buffer.concat(data);
                    let params = {
                        path: `/rest/corp/mail2bank/attachment`,
                        method: 'POST',
                        postData: {
                            mail2BankId: request.payload.id,
                            file: {
                                value: buf,
                                options: {
                                    filename: request.payload.file.hapi.filename,
                                    contentType: request.payload.file.hapi.headers['content-type'],
                                }
                            }
                        },
                        multipart: true,
                    };
                    params = Object.assign(params, request.auth);

                    requestToISimple(params)
                    .then((res) => {
                        reply(res.result).code(res.statusCode).type('application/json');
                    })
                    .catch((rej) => {
                        reply(rej.toString());
                    });
                });
            }
        },
    ]);

    next();
};

exports.register.attributes = {
    name: 'documents'
};
