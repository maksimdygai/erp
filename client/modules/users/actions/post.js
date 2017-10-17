import fetch from 'isomorphic-fetch';
import fetchUsers from './fetch.js';
import {browserHistory} from 'react-router';

export default payload => dispatch =>
    fetch('/api/user/add/', {
        body       : JSON.stringify(payload),
        credentials: 'include',
        method     : 'POST'
    })

    .then(() => dispatch(fetchUsers))
    .then(() => browserHistory.push('/users'))
    .catch(error => console.log(error));
    