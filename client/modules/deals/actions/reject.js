import { FETCH_DEALS_FAILURE } from '../constants.js';

export default error => ({
    error,
    type: FETCH_DEALS_FAILURE
});
