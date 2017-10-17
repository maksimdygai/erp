import { FETCH_USERNOTES_REQUEST } from '../constants.js';

export default isFetching => ({
    isFetching,
    type: FETCH_USERNOTES_REQUEST
});
