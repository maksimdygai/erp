import fetch from 'isomorphic-fetch';
import removeSuccess from './remove_success.js';

export default id => (dispatch, getState) => {
	const
		departments_dicts = getState().departments_dicts.data

    fetch(`/api/department/remove/${id}`, {
        credentials: 'include',
        method     : 'DELETE'
    })

    .then(response => {
    	if(response.ok)
    		return response.json()
    })

    .then(data => dispatch(removeSuccess(data.id, departments_dicts)))
    .catch(error => console.log(error));
}
