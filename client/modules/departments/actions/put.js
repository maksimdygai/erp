import fetch from 'isomorphic-fetch';
import fetchDepartments from './fetch.js';
import {browserHistory} from 'react-router';

export default payload => dispatch =>
    fetch('/api/office_dep_ref/edit', {
        body       : JSON.stringify(payload),
        credentials: 'include',
        method     : 'PUT'
    })

    .then(() => dispatch(fetchDepartments))
    .then(() => browserHistory.push('/departments'))
    .catch(error => console.log(error));
