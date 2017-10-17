import fetch from 'isomorphic-fetch';
import fetchOffices from './fetch.js';
import {browserHistory} from 'react-router';

export default payload => dispatch =>
    fetch('/api/office/add', {
        body       : JSON.stringify(payload),
        credentials: 'include',
        method     : 'POST'
    })

    .then(() => dispatch(fetchOffices))
    .then(() => browserHistory.push('/offices'))
    .catch(error => console.log(error));
