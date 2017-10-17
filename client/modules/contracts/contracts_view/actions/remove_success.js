import { REMOVE_CONTRACTVIEW } from '../constants.js';

export default (id, data) => ({
	id,
    data,
    type: REMOVE_CONTRACTVIEW
});
