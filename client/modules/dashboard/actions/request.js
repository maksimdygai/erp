import { FETCH_SUMMARY_REQUEST } from '../constants.js';

export default isFetching => ({
    isFetching,
    type: FETCH_SUMMARY_REQUEST
});
