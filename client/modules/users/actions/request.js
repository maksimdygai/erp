import { FETCH_USERS_REQUEST } from '../constants.js';

export default isFetching => ({
    type: FETCH_USERS_REQUEST,
    isFetching,
});
