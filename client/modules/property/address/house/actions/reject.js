import { FETCH_HOUSES_FAILURE } from '../constants.js';

export default error => ({
    error,
    type: FETCH_HOUSES_FAILURE
});
