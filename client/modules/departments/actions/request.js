import { FETCH_DEPARTMENTS_REQUEST } from '../constants.js';

export default isFetching => ({
    type: FETCH_DEPARTMENTS_REQUEST,
    isFetching,
});
