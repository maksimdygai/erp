import { FETCH_COMMERCIAL_PROPERTY_FAILURE } from '../constants.js';

export default error => ({
    error,
    type: FETCH_COMMERCIAL_PROPERTY_FAILURE
});
