import fetch from 'isomorphic-fetch';
import {browserHistory} from 'react-router';

export default payload => dispatch =>
    fetch('/api/deal/edit', {
        body       : JSON.stringify(payload),
        credentials: 'include',
        method     : 'PUT'
    })

    .then(() => browserHistory.push('/deals'))
    .catch(error => console.log(error));
