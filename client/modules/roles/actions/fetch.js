import requestAccounts from './request.js';
import receiveAccounts from './receive.js';
import rejectAccounts from './reject.js';
import config from '../../config.js';

export default function fetchAccounts(callback) {
	return dispatch => {
		dispatch(requestAccounts(true));

		return fetch('/api/roles/list', {
			method: 'GET',
			credentials: 'include',
		})

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
				callback(json);
				dispatch(rejectAccounts(null));
			}
		})
		.catch(error => {
			dispatch(requestAccounts(false));
			dispatch(rejectAccounts(error));
		});
	};
}
