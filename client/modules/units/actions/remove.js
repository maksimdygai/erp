import fetch from 'isomorphic-fetch';
import removeSuccess from './remove_success.js';

export default id => (dispatch, getState) => {
	const
		units = getState().units.data

    fetch(`/api/unit/remove/${id}`, {
        credentials: 'include',
        method     : 'DELETE'
    })

    .then(response => {
    	if(response.ok)
    		return response.json()
    })

    .then(data => dispatch(removeSuccess(data.id, units)))
    .catch(error => console.log(error));
}
