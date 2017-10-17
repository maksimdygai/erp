import fetch from 'isomorphic-fetch';
import requestLoginData from './request.js';
import receiveLoginData from './receive.js';
import rejectLoginData from './reject.js';

export default () => {
    return dispatch => {
        dispatch(requestLoginData(true));

        return fetch('/api/v1/products/accounts', {
            credentials: 'include',
        })

        .then(response => {
            if (response.ok)
                return response.json();

            response.json().then(error => dispatch(rejectLoginData(error)));
        })

        .then(json => {
            dispatch(requestLoginData(false));

            if (json) {
                dispatch(receiveLoginData(json));
                dispatch(rejectLoginData(null));
            }
        })

        .catch(error => {
            dispatch(requestLoginData(false));
            dispatch(rejectLoginData(error));
        });
    };
};
