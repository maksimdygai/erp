import { FETCH_STREETS_FAILURE } from '../constants.js';

export default error => ({
    error,
    type: FETCH_STREETS_FAILURE
});
