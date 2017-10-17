import fetch from 'isomorphic-fetch';
import fetchCategories from './fetch.js';
import {browserHistory} from 'react-router';

export default payload => dispatch =>
    fetch('/api/category/edit', {
        body       : JSON.stringify(payload),
        credentials: 'include',
        method     : 'PUT'
    })

    .then(() => dispatch(fetchCategories))
    .then(() => browserHistory.push('/categories'))
    .catch(error => console.log(error));
