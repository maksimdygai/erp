import { REMOVE_CATEGORY } from '../constants.js';

export default (id, data) => ({
	id,
    data,
    type: REMOVE_CATEGORY
}); 
