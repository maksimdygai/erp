import fetch from 'isomorphic-fetch';
import fetchUnits from './fetch.js';
import {browserHistory} from 'react-router';

export default payload => dispatch =>
    fetch('/api/unit/edit', {
        body       : JSON.stringify(payload),
        credentials: 'include',
        method     : 'PUT'
    })

    .then(() => dispatch(fetchUnits))
    .then(() => browserHistory.push('/units'))
    .catch(error => console.log(error));
