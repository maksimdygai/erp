import { FETCH_OFFICES_REQUEST } from '../constants.js';

export default isFetching => ({
    isFetching,
    type: FETCH_OFFICES_REQUEST
});