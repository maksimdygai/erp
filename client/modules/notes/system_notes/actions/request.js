import { FETCH_SYSTEMNOTES_REQUEST } from '../constants.js';

export default isFetching => ({
    isFetching,
    type: FETCH_SYSTEMNOTES_REQUEST
});
