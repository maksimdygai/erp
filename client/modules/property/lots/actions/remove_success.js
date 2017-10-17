import { REMOVE_LOT } from '../constants.js';

export default (id, data) => ({
	id,
    data,
    type: REMOVE_LOT
});
