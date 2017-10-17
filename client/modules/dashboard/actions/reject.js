import { FETCH_SUMMARY_FAILURE } from '../constants.js';

export default error => ({
    error,
    type: FETCH_SUMMARY_FAILURE
});
