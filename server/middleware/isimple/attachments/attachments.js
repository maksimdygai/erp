
const requestToISimple = require('../request/request.js');
const http = require('http');

let attachmentHelper = {
	getRequestTypes: function(auth){
		return new Promise((resolve, reject) => {
			let params = {
				path: '/rest/corp/client_request/types',
				method: 'GET'
			}
			params = Object.assign(params, auth);
			
			
			requestToISimple(params)
			.then(function(res){
				
				console.log(res);
				
				let result = JSON.parse(res.result);
				let groupJson = result.requestTypeGroupJson;
				let resultJson;
				
				for(var p in groupJson){
					if (groupJson[p].caption == "Документы для открытия счетов"){
						resultJson = groupJson[p] 
					}
				}				
				
				resolve(resultJson);
			});
			
		});
	},
	getIdByCode: function(code, arr){
		let result;
		for(var p in arr){
			if(arr[p].code == code){
				result = arr[p].id;
			}
		}
		
		return result;
	},
	getAllowedAttachment: function(auth, code, headers){
		var this_ = this;
			
		console.log("-------------------------------");
		console.log(headers);
		return new Promise((resolve, reject) => {
			this_.getRequestTypes(auth).then((response) => {
				let id = this_.getIdByCode(code, response.requestTypes);
				
				let params = {
					path: '/rest/corp/client_request/rosevro/allowed_attachment_types?typeId=' + id,
					method: 'GET',
					cookie: headers.cookie
				}
				
				requestToISimple(params)
				.then(function(res){
					resolve(res);
				});
				
			});
		});
	}
}

module.exports = attachmentHelper;