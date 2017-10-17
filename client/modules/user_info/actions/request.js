import { FETCH_USER_INFO_REQUEST } from '../constants.js';

export default isFetching => ({
    isFetching,
    type: FETCH_USER_INFO_REQUEST
});
