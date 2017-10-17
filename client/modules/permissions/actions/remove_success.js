import { REMOVE_PERMISSION } from '../constants.js';

export default (id, data) => ({
	id,
    data,
    type: REMOVE_PERMISSION
}); 
