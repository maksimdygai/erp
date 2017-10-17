import { FETCH_LOTS_REQUEST } from '../constants.js';

export default isFetching => ({
    isFetching,
    type: FETCH_LOTS_REQUEST
});
