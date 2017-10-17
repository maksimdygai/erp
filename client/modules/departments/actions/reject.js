import { FETCH_DEPARTMENTS_FAILURE } from '../constants.js';

export default error => ({
    type: FETCH_DEPARTMENTS_FAILURE,
    error,
});
