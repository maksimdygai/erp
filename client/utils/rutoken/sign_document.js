import loadPlugin from './load_plugin.js';

export function signDocument(pin, certificate, base64data) {
    return new Promise((resolve, reject) => {
        loadPlugin().then(function (plugin) {
            plugin.login(0, pin);
            return plugin.sign(0, certificate, base64data, true, {
                detached: false,
                addUserCertificate: true,
                addSignTime: true,
                useHardwareHash: false
            });
        }).then(res => {
            resolve(res);
        }).catch(function (reason) {
            reject(reason);
        });
    });
}

export function signDocumentArray(pin, certificate, base64data) {
    return new Promise((resolve, reject) => {
        loadPlugin().then(function (plugin) {
            plugin.login(0, pin);
            let signPromises = base64data.map(data => {
                return plugin.sign(0, certificate, data, true, {
                    detached: false,
                    addUserCertificate: true,
                    addSignTime: true,
                    useHardwareHash: false
                });
            });
            return Promise.all(signPromises);
        }).then(values => {
            resolve(values);
        }).catch(function (reason) {
            reject(reason);
        });
    });
}
