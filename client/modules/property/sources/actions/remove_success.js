import { REMOVE_SOURCE } from '../constants.js';

export default (id, data) => ({
	id,
    data,
    type: REMOVE_SOURCE
}); 
