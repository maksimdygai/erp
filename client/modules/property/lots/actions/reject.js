import { FETCH_LOTS_FAILURE } from '../constants.js';

export default error => ({
    error,
    type: FETCH_LOTS_FAILURE
});
