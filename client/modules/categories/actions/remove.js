import fetch from 'isomorphic-fetch';
import removeSuccess from './remove_success.js';

export default id => (dispatch, getState) => {
	const
		categories = getState().categories.data

    fetch(`/api/category/remove/${id}`, {
        credentials: 'include',
        method     : 'DELETE'
    })

    .then(response => {
    	if(response.ok)
    		return response.json()
    })

    .then(data => dispatch(removeSuccess(data.id, categories)))
    .catch(error => console.log(error));
}
