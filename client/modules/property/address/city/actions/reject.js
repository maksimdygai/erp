import { FETCH_CITIES_FAILURE } from '../constants.js';

export default error => ({
    error,
    type: FETCH_CITIES_FAILURE
});
