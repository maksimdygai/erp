import rutoken from 'rutoken';

export default function loadPlugin() {
    return new Promise((resolve, reject) => {
        rutoken.ready.then(function () {
            if (window.chrome) {
                return rutoken.isExtensionInstalled();
            } else {
                return Promise.resolve(true);
            }
        }).then(function (result) {
            if (result) {
                return rutoken.isPluginInstalled();
            } else {
                return reject(`Rutoken Extension wasn't found`);
            }
        }).then(function (result) {
            if (result) {
                return rutoken.loadPlugin();
            } else {
                return reject(`Rutoken Plugin wasn't found`);
            }
        }).then(plugin => {
            return resolve(plugin);
        });
    });
}
