import { FETCH_CATEGORIES_FAILURE } from '../constants.js';

export default error => ({
    type: FETCH_CATEGORIES_FAILURE,
    error,
});