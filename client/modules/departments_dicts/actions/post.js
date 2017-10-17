import fetch from 'isomorphic-fetch';
import fetchDepartmentsDicts from './fetch.js';
import {browserHistory} from 'react-router';

export default payload => dispatch =>
    fetch('/api/department/add', {
        body       : JSON.stringify(payload),
        credentials: 'include',
        method     : 'POST'
    })

    .then(() => dispatch(fetchDepartmentsDicts))
    .then(() => browserHistory.push('/departments_dicts'))
    .catch(error => console.log(error));
