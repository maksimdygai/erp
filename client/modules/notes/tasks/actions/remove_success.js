import { REMOVE_TASK } from '../constants.js';

export default (id, data) => ({
	id,
    data,
    type: REMOVE_TASK
});
