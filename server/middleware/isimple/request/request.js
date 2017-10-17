'use strict';

const firstStep = require('./firstStep.js');
const secondStep = require('./secondStep.js');
const digestAuth = require('./../auth/digestAuth.js');

/**
 * Осуществляет запрос в iSimple,
 * используя Digest авторизацию
 *
 * @param {Object} params - параметры запроса
 * @param {String} params.path - адрес rest сервиса в iSimple
 * @param {String} params.method - метод HTTP-запроса
 * @param {Object} params.postData - данные для передачи методом POST
 *
 * @return {Promise}
 */
function requestToISimple(params) {
    return new Promise((resolve, reject) => {
        firstStep(params)
        .then((authParams) => {
            params.nc = "00000001";
            params.authorizationHeader = digestAuth.generateAuthorizationHeader(Object.assign(params, authParams));
            return params;
        })
        .then((res) => {
            return secondStep(res);
        })
        .then((res) => {
            resolve(res);
        })
        .catch((rej) => {
            console.log(rej);
            reject(rej);
        });
    });
}

module.exports = requestToISimple;
