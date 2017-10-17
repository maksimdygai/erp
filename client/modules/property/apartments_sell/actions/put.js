import fetch from 'isomorphic-fetch';
import {browserHistory} from 'react-router';

export default payload => dispatch =>
    fetch('/api/apartment_sale/edit', {
        body       : JSON.stringify(payload),
        credentials: 'include',
        method     : 'PUT'
    })

    .then(() => browserHistory.push('/apartments_sell'))
    .catch(error => console.log(error));
