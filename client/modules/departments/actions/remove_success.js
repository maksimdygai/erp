import { REMOVE_DEPARTMENT } from '../constants.js';

export default (id, data) => ({
	id,
    data,
    type: REMOVE_DEPARTMENT
}); 
