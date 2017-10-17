import fetch from 'isomorphic-fetch';
import viewSuccess from './view_success.js';

export default id => dispatch => {
    fetch(`/api/office_dep_ref/view/${id}`, {
        method: 'GET',
        credentials: 'include'
    })

    .then(response => {
    	if(response.ok)
    		return response.json()
    })

    .then(data => dispatch(viewSuccess(data)))
    .catch(error => console.error(error));
};
