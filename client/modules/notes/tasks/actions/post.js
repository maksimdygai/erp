import fetch from 'isomorphic-fetch';
import postSuccess from './post_success.js';

export default payload => (dispatch, getState) => {
    const
      tasks = getState().notes.tasks.data;

    fetch('/api/task/add', {
        body       : JSON.stringify(payload),
        credentials: 'include',
        method     : 'POST'
    })

    .then(response => {
    	if(response.ok)
    		return response.json();
    })

    .then(() => dispatch(postSuccess(tasks.concat(payload))))
    .catch(error => console.log(error));
}
