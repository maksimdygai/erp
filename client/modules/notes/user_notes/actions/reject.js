import { FETCH_USERNOTES_FAILURE } from '../constants.js';

export default error => ({
    error,
    type: FETCH_USERNOTES_FAILURE
});
