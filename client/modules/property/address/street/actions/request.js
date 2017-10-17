import { FETCH_STREETS_REQUEST } from '../constants.js';

export default isFetching => ({
    isFetching,
    type: FETCH_STREETS_REQUEST
});
