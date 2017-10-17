import fetch from 'isomorphic-fetch';
import requestLoginData from './request.js';
import receiveLoginData from './receive.js';
import rejectLoginData from './reject.js';

export default function fetchAccounts() {
    return dispatch => {
        dispatch(requestLoginData(true));

        const url = '/api/login';
        const options = {
            credentials: 'include',
        };

        return fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
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
}
