//import fetch from 'isomorphic-fetch';
import requestAccounts from './request.js';
import receiveAccounts from './receive.js';
import rejectAccounts from './reject.js';
import config from '../../../config.js';

export default () => dispatch => {
    dispatch(requestAccounts(true));

    //const url = config.server + '/api/user/list';
    const
        url = '/api/position/list',
        options = {
            method: 'GET',
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
                dispatch(receiveAccounts(json));
                dispatch(rejectAccounts(null));
            }
        })

        .catch(error => {
            dispatch(requestAccounts(false));
            dispatch(rejectAccounts(error));
        });
};
