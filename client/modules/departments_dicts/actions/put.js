import fetch from 'isomorphic-fetch';
import fetchDepartmentsDicts from './fetch.js';
import {browserHistory} from 'react-router';

export default payload => dispatch =>
    fetch('/api/department/edit', {
        body       : JSON.stringify(payload),
        credentials: 'include',
        method     : 'PUT'
    })

    .then(() => dispatch(fetchDepartmentsDicts))
    .then(() => browserHistory.push('/departments_dicts'))
    .catch(error => console.log(error));
