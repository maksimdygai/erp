
const http = require('http');
const CONFIG = require('./../config/config.js');


function httpGet(url){

	let config = {
		hostname: CONFIG.isimple.host,
		port: CONFIG.isimple.port,
		path: encodeURI(url)
	}

	return new Promise((resolve, reject) => {
		http.get(config, (response) => {

			let result = "";
            response.on('data', (chunk) => {
                result += chunk;
            });
            response.on('end', () => {
                resolve(
                    {
                        statusCode: response.statusCode,
                        headers: response.headers,
                        result: result
                    }
                );
            });
		});
	})

}

module.exports = httpGet;
