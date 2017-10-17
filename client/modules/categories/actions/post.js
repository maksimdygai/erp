import fetch from 'isomorphic-fetch';
import fetchCategories from './fetch.js';
import {browserHistory} from 'react-router';

export default payload => dispatch =>
    fetch('/api/category/add', {
        body       : JSON.stringify(payload),
        credentials: 'include',
        method     : 'POST'
    })

    .then(() => dispatch(fetchCategories))
    .then(() => browserHistory.push('/categories'))
    .catch(error => console.log(error));
