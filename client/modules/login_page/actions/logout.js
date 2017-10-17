import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

export default callback => dispatch => {
    fetch('/api/logout', {
	    method: "GET",
	    credentials: 'include'
	})

	.then(response => response.json())
	
	.then(json => {
	    if(json.authorize === false)
	        browserHistory.push('/login');
	})

	.catch(error => console.error(error));
};
