import { FETCH_CATEGORIES_REQUEST } from '../constants.js';

export default isFetching => ({
    type: FETCH_CATEGORIES_REQUEST,
    isFetching,
});
