import loadPlugin from './load_plugin.js';

export default function loginOnToken(pin) {
    return new Promise((resolve, reject) => {
        loadPlugin().then(plugin => {
            plugin.login(0, pin);
            resolve(true);
        }).catch(err => {
            reject(err);
        });
    });
}
