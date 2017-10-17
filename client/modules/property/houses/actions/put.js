import fetch from 'isomorphic-fetch';
import {browserHistory} from 'react-router';

export default payload => dispatch =>
    fetch('/api/house/edit', {
        body       : JSON.stringify(payload),
        credentials: 'include',
        method     : 'PUT'
    })

    .then(() => browserHistory.push('/houses'))
    .catch(error => console.log(error));
