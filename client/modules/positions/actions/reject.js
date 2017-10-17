import { FETCH_POSITIONS_FAILURE } from '../constants.js';

export default error => ({
    error,
    type: FETCH_POSITIONS_FAILURE
});
