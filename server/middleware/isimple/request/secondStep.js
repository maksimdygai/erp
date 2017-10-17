'use strict';

const http = require('http');
const request = require('request');
const querystring = require('querystring');
const CONFIG = require('./../../../config/config.js');

/**
 * Второй шаг авторизации в iSimple
 * Отправляем запрос, указывая в заголовке Authorization необходимые данные
 * для Digest авторизации
 *
 * @param {Object} params - параметры для выполнения запроса
 * @param {String} params.path - адрес rest-сервиса в iSimple
 * @param {String} params.method - метод HTTP-запроса
 * @param {String} params.authorizationHeader - строка с данными для авторизации
 * @param {Object} params.postData - данные для передачи методом POST
 *
 * @return {Promise}
 */
function secondStep(params) {
    const options = {
        hostname: CONFIG.isimple.host,
        port: CONFIG.isimple.port,
        path: params.path,
        method: params.method.toUpperCase(),
        headers: {
            'Authorization': params.authorizationHeader,
            'Content-type': 'application/json',
        }
    };

    if (params.multipart) {
        return new Promise((resolve, reject) => {
            request.post({
                url: `http://${options.hostname}:${options.port}${options.path}`,
                headers: {
                    'Authorization': options.headers.Authorization,
                },
                formData: params.postData,
            }, function(err, res, body) {
                if (err) {
                    reject(err);
                    return console.error('upload failed:', err);
                }
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    result: body
                });
            });
        });
    }

    return new Promise((resolve, reject) => {
        let req = http.request(options, (res) => {
            if (!params.binary) {
                res.setEncoding('utf8');
            }
            let result = "";
            let data = [];
            res.on('data', (chunk) => {
                if (params.binary) {
                    data.push(chunk);
                } else {
                    result += chunk;
                }
            });
            res.on('end', () => {
                let buf;
                if (params.binary) {
                    buf = Buffer.concat(data);
                }
                resolve(
                    {
                        statusCode: res.statusCode,
                        headers: res.headers,
                        result: params.inBase64 ? buf.toString('base64') : params.binary ? buf : result
                    }
                );
            });
        });

        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
            reject(e.message);
        });

        // write data to request body
        if (params.method.toUpperCase() === "POST" && params.postData) {
            req.write(JSON.stringify(params.postData));
            console.log('POST DATA', JSON.stringify(params.postData));
        }
        req.end();
    });
}

module.exports = secondStep;
