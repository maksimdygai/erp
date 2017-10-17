'use strict';

const http = require('http');
const request_ = require('request');
const fromData = require('form-data');
const config = require('../config/config.js');

exports.register = function(server, options, next) {
	server.route([
		{
			method: 'GET',
			path: '/api/v1/products/accounts',
			handler: function (request, reply) {

				let contentObj = {
					"users": [
						{
							"id": 1,
							"first_name": "Reginaldo",
							"last_name": "Figueredo",
							"password": "reg1nald0",
							"super": true,
							"user_pic": "profile1.jpg",
							"username": "reginaldo_f"
						},

						{
							"id": 2,
							"first_name": "Massimo",
							"last_name": "Dutti",
							"password": "mass1m0",
							"super": false,
							"user_pic": "profile2.jpg",
							"username": "massimo_d"
						}
					]
				}

				let content = JSON.stringify(contentObj);
				console.log(content);

				reply(content).code(200).type('application/json');
			}
		},

		{
			method: 'POST',
			path: '/api/v1/products/adduser',
			handler: function (request, reply) {


				let payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				let content = JSON.stringify(payload);
				console.log(content);

				reply(content).code(200).type('application/json');
			}
		},

		{
			method: 'POST',
			path:   '/api/login',
			handler: function (request, reply) {

				let payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				request_({
					uri: config.server + '/api/login',
					method: "POST",
					body: JSON.stringify({
						email: payload.email,
						password: payload.password,
						remember_me: payload.remember_me
					})
					}, function (error, response, body) {
						console.log("response", body);
						reply(body).header('set-cookie', response.headers["set-cookie"]).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'GET',
			path:   '/api/user_info',
			handler: function (request, reply) {

				let payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				request_({
					uri: config.server + '/api/user_info',
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					}
					}, function (error, response, body) {
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'GET',
			path:   '/api/logout',
			handler: function (request, reply) {

				let payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				request_({
					uri: config.server + '/api/logout',
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					}
					}, function (error, response, body) {
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'POST',
			path:   '/api/dashboard/agent',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/dashboard/agent',
					method: "POST",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'POST',
			path:   '/api/land/search',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/land/search',
					method: "POST",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'GET',
			path:   '/api/land/list',
			handler: function (request, reply) {
				request_({
					uri: config.server + '/api/land/list',
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'GET',
			path:   '/api/land/view/{id}',
			handler: function (request, reply) {

				var url =  config.server + '/api/land/view/' + request.params.id
				request_({
					uri: url ,
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'POST',
			path:   '/api/land/add',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/land/add',
					method: "POST",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'PUT',
			path:   '/api/land/edit',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/land/edit',
					method: "PUT",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'POST',
			path:   '/api/apartment_rent/search',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/apartment_rent/search',
					method: "POST",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'GET',
			path:   '/api/apartment_rent/list',
			handler: function (request, reply) {
				request_({
					uri: config.server + '/api/apartment_rent/list',
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'GET',
			path:   '/api/apartment_rent/view/{id}',
			handler: function (request, reply) {

				var url =  config.server + '/api/apartment_rent/view/' + request.params.id
				request_({
					uri: url ,
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'POST',
			path:   '/api/apartment_rent/add',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/apartment_rent/add',
					method: "POST",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'PUT',
			path:   '/api/apartment_rent/edit',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/apartment_rent/edit',
					method: "PUT",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'POST',
			path:   '/api/apartment_sale/search',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/apartment_sale/search',
					method: "POST",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'GET',
			path:   '/api/apartment_sale/list',
			handler: function (request, reply) {
				request_({
					uri: config.server + '/api/apartment_sale/list',
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'GET',
			path:   '/api/apartment_sale/view/{id}',
			handler: function (request, reply) {

				var url =  config.server + '/api/apartment_sale/view/' + request.params.id
				request_({
					uri: url ,
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'POST',
			path:   '/api/apartment_sale/add',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/apartment_sale/add',
					method: "POST",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'PUT',
			path:   '/api/apartment_sale/edit',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/apartment_sale/edit',
					method: "PUT",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'POST',
			path:   '/api/commercial_property/search',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/commercial_property/search',
					method: "POST",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'GET',
			path:   '/api/commercial_property/list',
			handler: function (request, reply) {
				request_({
					uri: config.server + '/api/commercial_property/list',
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'GET',
			path:   '/api/commercial_property/view/{id}',
			handler: function (request, reply) {

				var url =  config.server + '/api/commercial_property/view/' + request.params.id
				request_({
					uri: url ,
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'POST',
			path:   '/api/commercial_property/add',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/commercial_property/add',
					method: "POST",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'PUT',
			path:   '/api/commercial_property/edit',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/commercial_property/edit',
					method: "PUT",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'POST',
			path:   '/api/house/search',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/house/search',
					method: "POST",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'GET',
			path:   '/api/house/list',
			handler: function (request, reply) {
				request_({
					uri: config.server + '/api/house/list',
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'GET',
			path:   '/api/house/view/{id}',
			handler: function (request, reply) {

				var url =  config.server + '/api/house/view/' + request.params.id
				request_({
					uri: url ,
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'POST',
			path:   '/api/house/add',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/house/add',
					method: "POST",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'PUT',
			path:   '/api/house/edit',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/house/edit',
					method: "PUT",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'GET',
			path:   '/api/office/list',
			handler: function (request, reply) {
				request_({
					uri: config.server + '/api/office/list',
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'GET',
			path:   '/api/office/view/{id}',
			handler: function (request, reply) {

				var url =  config.server + '/api/office/view/' + request.params.id
				request_({
					uri: url ,
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'POST',
			path:   '/api/office/add',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/office/add',
					method: "POST",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'PUT',
			path:   '/api/office/edit',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/office/edit',
					method: "PUT",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'DELETE',
			path:   '/api/office/remove/{id}',

			handler: function(request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri   : config.server + '/api/office/remove/' + request.params.id,
					method: "DELETE",

					headers: {
						cookie: request.headers["cookie"]
					}

				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'GET',
			path:   '/api/user/list',
			handler: function (request, reply) {
				request_({
					uri: config.server + '/api/user/list',
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'GET',
			path:   '/api/user/view/{id}',
			handler: function (request, reply) {

				var url =  config.server + '/api/user/view/' + request.params.id
				request_({
					uri: url ,
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'POST',
			path:   '/api/user/add/',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/user/add/',
					method: "POST",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'PUT',
			path:   '/api/user/edit',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/user/edit',
					method: "PUT",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'DELETE',
			path:   '/api/user/remove/{id}',

			handler: function(request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri   : config.server + '/api/user/remove/' + request.params.id,
					method: "DELETE",

					headers: {
						cookie: request.headers["cookie"]
					}

				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'GET',
			path:   '/api/client/list',
			handler: function (request, reply) {
				request_({
					uri: config.server + '/api/client/list',
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'GET',
			path:   '/api/client/view/{id}',
			handler: function (request, reply) {

				var url =  config.server + '/api/client/view/' + request.params.id
				request_({
					uri: url ,
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'POST',
			path:   '/api/client/add',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/client/add',
					method: "POST",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'PUT',
			path:   '/api/client/edit',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/client/edit',
					method: "PUT",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'DELETE',
			path:   '/api/remove/remove/{id}',

			handler: function(request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri   : config.server + '/api/remove/remove/' + request.params.id,
					method: "DELETE",

					headers: {
						cookie: request.headers["cookie"]
					}

				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'GET',
			path:   '/api/contract_view/list',
			handler: function (request, reply) {
				request_({
					uri: config.server + '/api/contract_view/list',
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'POST',
			path:   '/api/contract_view/add',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/contract_view/add',
					method: "POST",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'GET',
			path:   '/api/deal/list',
			handler: function (request, reply) {
				request_({
					uri: config.server + '/api/deal/list',
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'GET',
			path:   '/api/deal/view/{id}',
			handler: function (request, reply) {

				var url =  config.server + '/api/deal/view/' + request.params.id
				request_({
					uri: url ,
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'POST',
			path:   '/api/deal/add',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/deal/add',
					method: "POST",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'PUT',
			path:   '/api/deal/edit',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/deal/edit',
					method: "PUT",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'DELETE',
			path:   '/api/deal/remove/{id}',

			handler: function(request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri   : config.server + '/api/deal/remove/' + request.params.id,
					method: "DELETE",

					headers: {
						cookie: request.headers["cookie"]
					}

				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'GET',
			path:   '/api/permissions/list',
			handler: function (request, reply) {
				request_({
					uri: config.server + '/api/permissions/list',
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'GET',
			path:   '/api/permissions/view/{id}',
			handler: function (request, reply) {

				var url =  config.server + '/api/permissions/view/' + request.params.id
				request_({
					uri: url ,
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'POST',
			path:   '/api/permissions/add',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/permissions/add',
					method: "POST",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'PUT',
			path:   '/api/permissions/edit',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/permissions/edit',
					method: "PUT",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'DELETE',
			path:   '/api/permissions/remove/{id}',

			handler: function(request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri   : config.server + '/api/permissions/remove/' + request.params.id,
					method: "DELETE",

					headers: {
						cookie: request.headers["cookie"]
					}

				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'GET',
			path:   '/api/position/list',
			handler: function (request, reply) {
				request_({
					uri: config.server + '/api/position/list',
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'GET',
			path:   '/api/position/view/{id}',
			handler: function (request, reply) {

				var url =  config.server + '/api/position/view/' + request.params.id
				request_({
					uri: url ,
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'POST',
			path:   '/api/position/add',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/position/add',
					method: "POST",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'PUT',
			path:   '/api/position/edit',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/position/edit',
					method: "PUT",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'DELETE',
			path:   '/api/position/remove/{id}',

			handler: function(request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri   : config.server + '/api/position/remove/' + request.params.id,
					method: "DELETE",

					headers: {
						cookie: request.headers["cookie"]
					}

				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'GET',
			path:   '/api/source/list',
			handler: function (request, reply) {
				request_({
					uri: config.server + '/api/source/list',
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'GET',
			path:   '/api/note/list',
			handler: function (request, reply) {
				request_({
					uri: config.server + '/api/note/list',
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'POST',
			path:   '/api/note/add',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/note/add',
					method: "POST",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}

				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'PUT',
			path:   '/api/note/edit',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/note/edit',
					method: "PUT",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'GET',
			path:   '/api/system_note/list',
			handler: function (request, reply) {
				request_({
					uri: config.server + '/api/system_note/list',
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'GET',
			path:   '/api/task/list',
			handler: function (request, reply) {
				request_({
					uri: config.server + '/api/task/list',
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'POST',
			path:   '/api/task/add',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/task/add',
					method: "POST",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}

				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'PUT',
			path:   '/api/task/edit',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/task/edit',
					method: "PUT",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'GET',
			path:   '/api/unit/list',
			handler: function (request, reply) {
				request_({
					uri: config.server + '/api/unit/list',
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'GET',
			path:   '/api/unit/view/{id}',
			handler: function (request, reply) {

				var url =  config.server + '/api/unit/view/' + request.params.id
				request_({
					uri: url ,
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'POST',
			path:   '/api/unit/add',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/unit/add',
					method: "POST",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'PUT',
			path:   '/api/unit/edit',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/unit/edit',
					method: "PUT",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'DELETE',
			path:   '/api/unit/remove/{id}',

			handler: function(request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri   : config.server + '/api/unit/remove/' + request.params.id,
					method: "DELETE",

					headers: {
						cookie: request.headers["cookie"]
					}

				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'GET',
			path:   '/api/roles/list',
			handler: function (request, reply) {
				request_({
					uri: config.server + '/api/roles/list',
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'GET',
			path:   '/api/roles/view/{id}',
			handler: function (request, reply) {

				var url =  config.server + '/api/roles/view/' + request.params.id
				request_({
					uri: url ,
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'POST',
			path:   '/api/roles/add',
			handler: function (request, reply) {

				var payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				request_({
					uri: config.server + '/api/roles/add',
					method: "POST",
					body: JSON.stringify(payload),
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'PUT',
			path:   '/api/roles/edit',
			handler: function (request, reply) {

				var payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				request_({
					uri: config.server + '/api/roles/edit',
					method: "PUT",
					body: JSON.stringify(payload),
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'DELETE',
			path:   '/api/roles/remove/{id}',
			handler: function (request, reply) {

				var payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				request_({
					uri: config.server + '/api/roles/remove/' + request.params.id,
					method: "DELETE",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'GET',
			path:   '/api/category/list',
			handler: function (request, reply) {
				request_({
					uri: config.server + '/api/category/list',
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'GET',
			path:   '/api/category/view/{id}',
			handler: function (request, reply) {

				var url =  config.server + '/api/category/view/' + request.params.id
				request_({
					uri: url ,
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'PUT',
			path:   '/api/category/edit',
			handler: function (request, reply) {

				var payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				request_({
					uri: config.server + '/api/category/edit',
					method: "PUT",
					body: JSON.stringify(payload),
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'POST',
			path:   '/api/category/add',
			handler: function (request, reply) {

				var payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				request_({
					uri: config.server + '/api/category/add',
					method: "POST",
					body: JSON.stringify(payload),
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'DELETE',
			path:   '/api/category/remove/{id}',
			handler: function (request, reply) {

				var payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				request_({
					uri: config.server + '/api/category/remove/' + request.params.id,
					method: "DELETE",
					headers: {
						"cookie": request.headers["cookie"]
					}
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'GET',
			path:   '/api/department/list',
			handler: function (request, reply) {
				request_({
					uri: config.server + '/api/department/list',
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'GET',
			path:   '/api/department/view/{id}',
			handler: function (request, reply) {

				var url =  config.server + '/api/department/view/' + request.params.id
				request_({
					uri: url ,
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'PUT',
			path:   '/api/department/edit',
			handler: function (request, reply) {

				var payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				request_({
					uri: config.server + '/api/department/edit',
					method: "PUT",
					body: JSON.stringify(payload),
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'POST',
			path:   '/api/department/add',
			handler: function (request, reply) {

				var payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				request_({
					uri: config.server + '/api/department/add',
					method: "POST",
					body: JSON.stringify(payload),
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'DELETE',
			path:   '/api/department/remove/{id}',
			handler: function (request, reply) {

				var payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				request_({
					uri: config.server + '/api/department/remove/' + request.params.id,
					method: "DELETE",
					headers: {
						"cookie": request.headers["cookie"]
					}
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'GET',
			path:   '/api/office_dep_ref/list',
			handler: function (request, reply) {
				request_({
					uri: config.server + '/api/office_dep_ref/list',
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						console.log(body);
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'GET',
			path:   '/api/office_dep_ref/view/{id}',
			handler: function (request, reply) {

				var url =  config.server + '/api/office_dep_ref/view/' + request.params.id
				request_({
					uri: url ,
					method: "GET",
					headers: {
						"cookie": request.headers["cookie"]
					},
					}, function (error, response, body) {
						reply(body).code(response.statusCode).type("text/html");
					});
			}
		},

		{
			method: 'POST',
			path:   '/api/office_dep_ref/add',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/office_dep_ref/add',
					method: "POST",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'PUT',
			path:   '/api/office_dep_ref/edit',

			handler: function (request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri: config.server + '/api/office_dep_ref/edit',
					method: "PUT",
					body: JSON.stringify(payload),

					headers: {
						cookie: request.headers["cookie"]
					}
				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		},

		{
			method: 'DELETE',
			path:   '/api/office_dep_ref/remove/{id}',

			handler: function(request, reply) {
				let
					payload = typeof request.payload === 'string' ? JSON.parse(request.payload) : request.payload;

				console.log("cookie", request.headers["cookie"])

				request_({
					uri   : config.server + '/api/office_dep_ref/remove/' + request.params.id,
					method: "DELETE",

					headers: {
						cookie: request.headers["cookie"]
					}

				}, function (error, response, body) {
					console.log("body", body);
					reply(body).code(response.statusCode).type("text/html");
				});
			}
		}
	]);

	next();
};



exports.register.attributes = {
	name: 'products'
};
