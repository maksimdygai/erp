import fetch from 'isomorphic-fetch';
import removeSuccess from './remove_success.js';

export default id => (dispatch, getState) => {
	const
		departments = getState().departments.data

    fetch(`/api/office_dep_ref/remove/${id}`, {
        credentials: 'include',
        method     : 'DELETE'
    })

    .then(response => {
    	if(response.ok)
    		return response.json()
    })

    .then(data => dispatch(removeSuccess(data.id, departments)))
    .catch(error => console.log(error));
}
