import request from './request.js';
import receive from './receive.js';
import reject from './reject.js';
import config from '../../config.js';

export default payload => dispatch => {
    dispatch(request(true));

    return fetch('/api/dashboard/agent', {
        body       : JSON.stringify({}),
        credentials: 'include',
        method     : 'POST'
    })

    .then(response => {
        if(response.ok)
            return response.json();

        response.json().then(error => dispatch(reject(error)));
    })

    .then(json => {
        dispatch(request(false));

        if (json) {
            dispatch(receive(json));
            dispatch(reject(null));
        }
    })

    .catch(error => {
        dispatch(request(false));
        dispatch(reject(error));
    });
};
