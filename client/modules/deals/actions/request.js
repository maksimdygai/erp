import { FETCH_DEALS_REQUEST } from '../constants.js';

export default isFetching => ({
    isFetching,
    type: FETCH_DEALS_REQUEST
});
