import { FETCH_PERMISSIONS_FAILURE } from '../constants.js';

export default error => ({
    error,
    type: FETCH_PERMISSIONS_FAILURE
});
