import fetch from 'isomorphic-fetch';
import removeSuccess from './remove_success.js';

export default id => (dispatch, getState) => {
	const
		userNotes = getState().userNotes.data

    fetch(`/api/note/remove/${id}`, {
        credentials: 'include',
        method     : 'DELETE'
    })

    .then(response => {
    	if(response.ok)
    		return response.json()
    })

    .then(data => dispatch(removeSuccess(data.id, userNotes)))
    .catch(error => console.log(error));
}
