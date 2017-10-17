import { FETCH_SOURCES_FAILURE } from '../constants.js';

export default error => ({
    error,
    type: FETCH_SOURCES_FAILURE
});
