import fetch from 'isomorphic-fetch';
import {browserHistory} from 'react-router';

export default (payload, isInline) => dispatch =>
    fetch('/api/client/edit', {
        body       : JSON.stringify(payload),
        credentials: 'include',
        method     : 'PUT'
    })

    .then(() => !isInline && browserHistory.push('/clients'))

    .then(response => {
    	if(response.ok)
    		return response.json();
    })
    .catch(error => console.log(error));
