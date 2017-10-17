import fetch from 'isomorphic-fetch';
import fetchPositions from './fetch.js';
import {browserHistory} from 'react-router';

export default payload => dispatch =>
    fetch('/api/position/edit', {
        body       : JSON.stringify(payload),
        credentials: 'include',
        method     : 'PUT'
    })

    .then(() => dispatch(fetchPositions))
    .then(() => browserHistory.push('/positions'))
    .catch(error => console.log(error));
