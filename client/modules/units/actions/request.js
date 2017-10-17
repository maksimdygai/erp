import { FETCH_UNITS_REQUEST } from '../constants.js';

export default isFetching => ({
    isFetching,
    type: FETCH_UNITS_REQUEST
});