import fetch from 'isomorphic-fetch';
import {browserHistory} from 'react-router';

export default payload => dispatch =>
    fetch('/api/deal/add', {
        body       : JSON.stringify(payload),
        credentials: 'include',
        method     : 'POST'
    })

    .then(() => browserHistory.push('/deals'))
    .catch(error => console.log(error));
