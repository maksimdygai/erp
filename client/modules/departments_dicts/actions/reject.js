import { FETCH_DEPARTMENTS_DICTS_FAILURE } from '../constants.js';

export default error => ({
    type: FETCH_DEPARTMENTS_DICTS_FAILURE,
    error,
});