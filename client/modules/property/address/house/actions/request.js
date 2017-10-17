import { FETCH_HOUSES_REQUEST } from '../constants.js';

export default isFetching => ({
    isFetching,
    type: FETCH_HOUSES_REQUEST
});
