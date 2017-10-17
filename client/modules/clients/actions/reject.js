import { FETCH_CLIENTS_FAILURE } from '../constants.js';

export default error => ({
    error,
    type: FETCH_CLIENTS_FAILURE
});
