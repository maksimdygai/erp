import { FETCH_ADDRESS_BY_ID_FAILURE } from '../constants.js';

export default error => ({
    error,
    type: FETCH_ADDRESS_BY_ID_FAILURE
});
