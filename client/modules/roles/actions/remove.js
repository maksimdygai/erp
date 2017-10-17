import fetch from 'isomorphic-fetch';
import removeSuccess from './remove_success.js';

export default id => (dispatch, getState) => {
	const
		roles = getState().roles.data

	fetch(`/api/roles/remove/${id}`, {
		credentials: 'include',
		method     : 'DELETE'
	})

	.then(response => {
		if(response.ok)
			return response.json()
	})

	.then(data => dispatch(removeSuccess(data.id, roles)))
	.catch(error => console.log(error));
}
