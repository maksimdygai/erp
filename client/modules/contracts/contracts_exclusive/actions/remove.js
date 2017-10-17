import fetch from 'isomorphic-fetch';
import removeSuccess from './remove_success.js';

export default id => (dispatch, getState) => {
	const
		contracts_exclusive = getState().contracts_exclusive.data

    fetch(`/api/contract_exclusive/remove/${id}`, {
        credentials: 'include',
        method     : 'DELETE'
    })

    .then(response => {
    	if(response.ok)
    		return response.json()
    })

    .then(data => dispatch(removeSuccess(data.id, contracts_exclusive)))
    .catch(error => console.log(error));
}
