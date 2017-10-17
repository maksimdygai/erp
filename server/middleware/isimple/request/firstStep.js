'use strict';

const http = require('http');
const CONFIG = require('./../../../config/config.js');

/**
 * Первый шаг для авторизации в iSimple
 * Необходим для получения данных для Digest авторизации
 * (передаются в заголовках)
 *
 * @param {Object} params - объект, содержащий параметры для запроса
 * @param {String} params.path - адрес rest-сервис в iSimple
 * @param {String} params.username - логин пользователя в системе iSimple
 *
 * @return {Promise} resolve - параметры для авторизации
 */
function firstStep(params) {
    let config = {
        hostname: CONFIG.isimple.host,
        port: CONFIG.isimple.port,
        path: params.path,
        headers: {
            'Authorization': `SP Digest username="${params.username}"`
        }
    };

    return new Promise((resolve, reject) => {
        http.get(config, (response) => {
            let authHeaders = response.headers['www-authenticate'];
            let matches = authHeaders.match(/([^ \t\r\n]+)\=("[^,\r\n]+")/g);
            let authParams = {};
            matches.forEach((param) => {
                let arr = param.replace(/"/g, '').replace(/={1,1}/, '||').split('||');
                authParams[arr[0]] = arr[1];
            });
            resolve(authParams);
        }).on('error', (e) => {
            console.log(`Got error: ${e.message}`);
            reject(e.message);
        });
    });
}

module.exports = firstStep;
