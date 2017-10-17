import { FETCH_USERS_FAILURE } from '../constants.js';

export default error => ({
    type: FETCH_USERS_FAILURE,
    error,
});