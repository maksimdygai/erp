import { FETCH_POSITIONS_REQUEST } from '../constants.js';

export default isFetching => ({
    isFetching,
    type: FETCH_POSITIONS_REQUEST
});
