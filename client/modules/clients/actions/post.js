import fetch from 'isomorphic-fetch';
import {browserHistory} from 'react-router';
import postSuccess from './post_success.js';

export default (payload, isInline) => (dispatch, getState) => {
    const
      clients = getState().clients.data;

    fetch('/api/client/add', {
        body       : JSON.stringify(payload),
        credentials: 'include',
        method     : 'POST'
    })

    .then(() => !isInline && browserHistory.push('/clients'))

    .then(response => {
    	if(response.ok)
    		return response.json();
    })

    .then(() => dispatch(postSuccess(clients.concat(payload))))
    .catch(error => console.log(error));
}
