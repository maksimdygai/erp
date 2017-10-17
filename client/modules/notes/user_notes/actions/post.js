import fetch from 'isomorphic-fetch';
import postSuccess from './post_success.js';

export default payload => (dispatch, getState) => {
    const
      userNotes = getState().notes.userNotes.data;

    fetch('/api/note/add', {
        body       : JSON.stringify(payload),
        credentials: 'include',
        method     : 'POST'
    })

    .then(response => {
    	if(response.ok)
    		return response.json();
    })

    .then(() => dispatch(postSuccess(userNotes.concat(payload))))
    .catch(error => console.log(error));
}
