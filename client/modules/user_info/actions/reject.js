import { FETCH_USER_INFO_FAILURE } from '../constants.js';

export default error => ({
    error,
    type: FETCH_USER_INFO_FAILURE
});
