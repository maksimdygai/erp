import request from './request.js';
import receive from './receive.js';
import reject from './reject.js';
import config from '../../config.js';

export default payload => dispatch => {
	const
		{entity, query} = payload;

	fetch(`/api/${entity}/search`, {
		body: JSON.stringify({
			search: query,
			offset: 0,
			limit : 0
		}),

		credentials: 'include',
		method     : 'POST'
	})

	.then(response => {
		if(response.ok)
			return response.json();

		response.json().then(error => dispatch(reject(entity, error)));
	})

	.then(json => {
		dispatch(request(entity, false));

		if(json) {
			dispatch(receive(entity, json));
			dispatch(reject(entity, null));
		}
	})

	.catch(error => {
		dispatch(request(entity, false));
		dispatch(reject(entity, error));
	});
}
