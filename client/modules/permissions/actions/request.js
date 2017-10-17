import { FETCH_PERMISSIONS_REQUEST } from '../constants.js';

export default isFetching => ({
    isFetching,
    type: FETCH_PERMISSIONS_REQUEST
});