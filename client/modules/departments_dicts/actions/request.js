import { FETCH_DEPARTMENTS_DICTS_REQUEST } from '../constants.js';

export default isFetching => ({
    type: FETCH_DEPARTMENTS_DICTS_REQUEST,
    isFetching,
});
