import fetch from 'isomorphic-fetch';
import deleteSuccess from './deleted.js';

export default id => (dispatch, getState) => {
	const
		users = getState().users.data

    fetch(`/api/user/remove/${id}`, {
        credentials: 'include',
        method     : 'DELETE'
    })

    .then(response => {
    	if(response.ok)
    		return response.json()
    })

    .then(data => dispatch(deleteSuccess(data.id, users)))
    .catch(error => console.log(error));
}
