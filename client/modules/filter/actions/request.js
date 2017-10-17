import { FILTER_REQUEST } from '../constants.js';

export default (key, isFetching) => ({
	key,
    isFetching,
    type: FILTER_REQUEST
});
