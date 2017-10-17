import loadPlugin from './load_plugin.js';

function getCertificatesByCategory(plugin, category) {
    const device = 0; // предполагаем, что у пользователя вставлен только один токен
    return new Promise((resolve, reject) => {
        plugin.enumerateCertificates(device, category).then(function(certificates) {
            resolve(certificates);
        }, function(err) {
            reject(err);
        });
    });
}

function parseCertificate(plugin, cert) {
    return new Promise((resolve, reject) => {
        plugin.parseCertificate(0, cert).then(result => {
            return resolve(Object.assign(result, {certId: cert}));
        }, err => {
            return reject(err);
        });
    });
}

function parseAllCertificates(plugin, certificates) {
    const promises = certificates.map(cert => parseCertificate(plugin, cert));
    return new Promise((resolve, reject) => {
        Promise.all(promises).then(result => {
            return resolve(result);
        }).catch(err => {
            return reject(err);
        });
    });
}

export default function getCertificates() {
    const result = [];
    return new Promise((resolve, reject) => {
        loadPlugin().then(plugin => {
            plugin.enumerateDevices().then(res => console.log(res));
            getCertificatesByCategory(plugin, plugin.CERT_CATEGORY_UNSPEC).then(certificates => {
                result.push(...certificates);
                return getCertificatesByCategory(plugin, plugin.CERT_CATEGORY_USER);
            }).then(certificates => {
                result.push(...certificates);
                return result;
            }).then(result => {
                //return resolve(result);
                return parseAllCertificates(plugin, result);
            }).then(result => {
                return resolve(result);
            }).catch(err => {
                reject(err);
            });
        }, err => {
            reject(err);
        });
    });
}
