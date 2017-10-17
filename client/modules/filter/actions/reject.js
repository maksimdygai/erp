import { FILTER_FAILURE } from '../constants.js';

export default (key, error) => ({
	key,
    error,
    type: FILTER_FAILURE
});
