import { DELETE_USER } from '../constants.js';

export default (id, data) => ({
	id,
    data,
    type: DELETE_USER
}); 
