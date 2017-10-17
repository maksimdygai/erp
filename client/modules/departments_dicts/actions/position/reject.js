import { GET_POSITIONARR_FAILURE } from '../../constants.js';

export default error => ({
    type: GET_POSITIONARR_FAILURE,
    error,
});