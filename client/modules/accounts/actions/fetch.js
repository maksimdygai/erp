import fetch from 'isomorphic-fetch';
import requestAccounts from './request.js';
import receiveAccounts from './receive.js';
import rejectAccounts from './reject.js';

export default function fetchAccounts() {
    return dispatch => {
        dispatch(requestAccounts(true));

        const url = '/api/v1/products/accounts';
        const options = {
            credentials: 'include',
        };

        return fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            response.json().then(error => dispatch(rejectAccounts(error)));
        })
        .then(json => {
            dispatch(requestAccounts(false));
            if (json) {
                const accounts = typeof json.account.length !== 'undefined' ? json.account : [json.account];
                dispatch(receiveAccounts(accounts));
                dispatch(rejectAccounts(null));
            }
        })
        .catch(error => {
            dispatch(requestAccounts(false));
            dispatch(rejectAccounts(error));
        });
    };
}
