import fetch from 'isomorphic-fetch';
import viewSuccess from './view_success.js';

export default id => (dispatch, getState) => {
    fetch(`/api/client/view/${id}`, {
        method: 'GET',
        credentials: 'include'
    })

    .then(response => {
    	if(response.ok)
    		return response.json()
    })

    .then(data => {
      let
        clients = getState().clients.view || [],
        ind = _.indexOf(clients, C => C.id == data.id);

      if (ind == -1) {
        clients = _.concat(clients, data);
      } else {
        clients[ind] = data;
      }

      dispatch(viewSuccess(clients))
    })
    .catch(error => console.error(error));
};
