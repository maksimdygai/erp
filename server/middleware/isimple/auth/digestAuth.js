'use strict';

const crypto = require('crypto');

/**
 * Возвращает MD5-hash строки
 *
 * @param {String} value - исходная строка
 *
 * @return {String}
 */
function md5(value) {
    return crypto.createHash('md5').update(value).digest('hex');
}

/**
 * Функция для генерации клиентской соли
 *
 * @return {String} - md5 hash
 */
function generateCNonce() {
    let _secretPhrase = "somesecretphrase";
    let _result = _secretPhrase + (new Date()).getTime();
	
	console.log("cnonce:" + _result);

    return md5(_result);
}

/**
 * Генерация параметра A1 для Digest Auth
 *
 * @param {Array} params - параметры для авторизации
 *
 * @return {String}
 */
function encodeA1(params) {
    let _passwordAndSalt = params.password;

    if (params.salt && params.salt.length > 0) {
        let _base64Salt = Buffer.from(params.salt, 'base64');
        _passwordAndSalt = `${params.password}{${_base64Salt}}`;
    }

    let A1 = `${params.username}:${params.realm}:${md5(_passwordAndSalt)}`;

    return md5(A1);
}

/**
 * Генерация параметра response для Digest Auth
 *
 * @param {Object} params - параметры для авторизации
 *
 * @return {String} параметр response для Digest Auth
 */
function generateResponse(params) {
    let _ha1 = encodeA1(params);
    let _path = params.path.replace(/\?.*$/, '');
    let _a2 = `${params.method}:${_path}`;
    let _ha2 = md5(_a2);

    return md5(`${_ha1}:${params.nonce}:${params.nc}:${params.cnonce}:${params.qop}:${_ha2}`);
}

/**
 * Генерация заголовка Authorization для Digest авторизации в системе iSimple
 *
 * @param {Object} params - параметры для авторизации
 *
 * @return {String} залоголовок авторизации
 */
function generateAuthorizationHeader(params) {
	console.log("=============================");
	console.log(params);
    params.cnonce = generateCNonce();
    let response = generateResponse(params);
    let _path = params.path.replace(/\?.*$/, '');
    let authorizationHeader = `SP Digest username="${params.username}", realm="${params.realm}", ` +
                              `nonce="${params.nonce}", uri="${_path}", response="${response}", ` +
                              `qop="${params.qop}", nc="${params.nc}", cnonce="${params.cnonce}"`;
    return authorizationHeader;
}

module.exports = {
    generateAuthorizationHeader: generateAuthorizationHeader
};
