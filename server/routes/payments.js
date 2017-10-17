'use strict';

const requestToISimple = require('../middleware/isimple/request/request.js');
const CONFIG = require('../config/config.js');

exports.register = function(server, options, next) {
    server.route([
        {
            method: 'POST',
            path: '/api/v1/products/getcorrnameinfo',
            handler: function (request, reply) {

                let url = '/rest/corp/dic/corr?name=';
                let payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

                var resUrl = url + payload.value;

                let params = {
                    path: encodeURI(resUrl),
                    method: 'GET'
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
            path: '/api/v1/payments_list/{count}',
            handler: function (request, reply) {
                if(request.params.count != 'all'){
                    var path = `/rest/corp/last_documents/doc_types?number_of_entries=${parseInt(request.params.count)*2}`
                } else {
                    var path = `/rest/corp/document/fordates_filter`
                }
                let params = {
                    path: path,
                    method: 'POST',
                    postData: {
                        "docTypes": [
                            {
                                "docModule":"ibankul",
                                "docType":"doc_platpor",
                            },

                        ],
                        docModule: 'ibankul',
                        docType: 'doc_platpor'
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
            path: '/api/v1/payments_list/{count}',
            handler: function (request, reply) {
                if(request.params.count != 'all'){
                    var path = `/rest/corp/document/fordates_filter`
                } else {
                    var path = `/rest/corp/document/fordates_filter`
                }
                const filterObject = JSON.parse(request.payload);
                let filterStatment = '';
                console.log('resObject:', filterObject);
                if(filterObject['amount'] !== '' && filterObject['amount'] != '0.00' ) {
                    filterStatment += 'amount=' + filterObject['amount'] + ' and ';
                }
                if(filterObject['bankBik'] !== '') {
                    filterStatment += "corrBankBik='" + filterObject['bankBik'] + "' and ";
                }
                if(filterObject['corrAccNumber'] !== '') {
                    filterStatment += "corrAccNumber='" + filterObject['corrAccNumber'] + "' and ";
                }
                if(filterObject['corrBankName'] !== '') {
                    filterStatment += "corrBankName='" + filterObject['corrBankName'] + "' and ";
                }

                if(filterObject['corrFullname'] !== '') {
                    filterStatment += "corrFullname='" + filterObject['corrFullname'] + "' and ";
                }

                if(filterObject['description'] !== '') {
                    filterStatment += "description='" + filterObject['description'] + "' and ";
                }

                if(filterObject['inn'] !== '') {
                    filterStatment += "corrInn='" + filterObject['inn'] + "' and ";
                }
                let statusCaption = '';

                if (filterObject['statusCancel'] === true ||
                    filterObject['statusComplite'] === true ||
                    filterObject['statusNew'] === true ||
                    filterObject['statusProgress'] === true )
                {
                    statusCaption = '';

                    if(filterObject['statusCancel'] !== false) {
                        statusCaption += 'status=' + "'decline' or";
                    }

                    if(filterObject['statusComplite'] !== false) {
                        statusCaption += 'status=' + "'end' or ";
                    }

                    if(filterObject['statusNew'] !== false) {
                        statusCaption += 'status=' + "'new' or ";
                    }

                    if(filterObject['statusProgress'] !== false) {
                        statusCaption += 'status=' + "'send' or ";

                    }

                    statusCaption = statusCaption.slice(0, -4);
                    statusCaption += ' and '

                }
                if(filterObject['statusAll'] === true) {
                    statusCaption = '';
                }
                filterStatment += statusCaption;


                filterStatment = filterStatment.slice(0, -5);
                let params = {
                    path: path,
                    method: 'POST',
                    postData: {
                        "docTypes": [
                            {
                                "docModule":"ibankul",
                                "docType":"doc_platpor",
                            },

                        ],
                        docModule: 'ibankul',
                        docType: 'doc_platpor',
                        filter: filterStatment
                    },
                };
                if(filterObject['date_from'] !== '') {
                    params['postData']['dateFrom'] = filterObject['date_from'];
                }

                if(filterObject['date_to'] !== '') {
                    params['postData']['dateTo'] = filterObject['date_to'];
                }
                params = Object.assign(params, request.auth);

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
    name: 'payments'
};
