import fetch from 'isomorphic-fetch';
import fetchRoles from './fetch.js';
import {browserHistory} from 'react-router';

export default payload => dispatch =>
	fetch('/api/roles/add', {
		body       : JSON.stringify(payload),
		credentials: 'include',
		method     : 'POST'
	})

	.then(() => dispatch(fetchRoles))
	.then(() => browserHistory.push('/roles'))
	.catch(error => console.log(error));
