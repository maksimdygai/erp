import { REMOVE_USERNOTE } from '../constants.js';

export default (id, data) => ({
	id,
    data,
    type: REMOVE_USERNOTE
});
