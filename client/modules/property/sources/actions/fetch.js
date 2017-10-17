import request from './request.js';
import receive from './receive.js';
import reject from './reject.js';

export default callback => dispatch => {
    dispatch(request(true));

    return fetch('/api/source/list', {
        credentials: 'include',
        method     : 'GET'
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
            callback(json);
            dispatch(reject(null));
        }
    })

    .catch(error => {
        dispatch(request(false));
        dispatch(reject(error));
    });
};
