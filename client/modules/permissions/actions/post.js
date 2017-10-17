import fetch from 'isomorphic-fetch';
import fetchPermissions from './fetch.js';
import {browserHistory} from 'react-router';

export default payload => dispatch =>
    fetch('/api/permissions/add', {
        body       : JSON.stringify(payload),
        credentials: 'include',
        method     : 'POST'
    })

    .then(() => dispatch(fetchPermissions))
    .then(() => browserHistory.push('/permissions'))
    .catch(error => console.log(error));
