import request from './request.js';
import receive from './receive.js';
import reject from './reject.js';
import {browserHistory} from 'react-router';

export default callback => dispatch => {
	dispatch(request(true));

	return fetch('/api/user_info', {
		method: "GET",
		credentials: 'include'
	})

	.then(response => {
        if(response.ok)
            return response.json();

        response.json().then(error => {
            dispatch(reject(error));
            browserHistory.push('/login');
        });
    })

    .then(json => {
        dispatch(request(false));

        if (json) {
            dispatch(receive(json));
            callback(json);
            dispatch(reject(null));
        }

        return json;
    })

    .then(json => {
        if(json.authorize == 'false')              
            browserHistory.push('/login')
	})

	.catch(error => {
        dispatch(request(false));
        dispatch(reject(error));
    });
}
