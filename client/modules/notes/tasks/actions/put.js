import fetch from 'isomorphic-fetch';
import fetchUnits from './fetch.js';
import {browserHistory} from 'react-router';

export default payload => dispatch => {
    fetch('/api/task/edit', {
        body       : JSON.stringify(payload),
        credentials: 'include',
        method     : 'PUT'
    })

    .then(() => dispatch(fetchUnits))
    .catch(error => console.log(error));
}
