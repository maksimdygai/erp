import { FETCH_SYSTEMNOTES_FAILURE } from '../constants.js';

export default error => ({
    error,
    type: FETCH_SYSTEMNOTES_FAILURE
});
