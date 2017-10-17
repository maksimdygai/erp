import { FETCH_OFFICES_FAILURE } from '../constants.js';

export default error => ({
    error,
    type: FETCH_OFFICES_FAILURE
});
