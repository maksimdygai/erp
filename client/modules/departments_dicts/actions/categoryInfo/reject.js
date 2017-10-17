import { GET_CATEGORYINFO_FAILURE } from '../../constants.js';

export default error => ({
    type: GET_CATEGORYINFO_FAILURE,
    error,
});