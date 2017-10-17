import { FILTER_SUCCESS } from '../constants.js';

export default (key, data) => ({
	key,
    data,
    type: FILTER_SUCCESS
});
