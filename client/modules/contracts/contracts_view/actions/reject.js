import { FETCH_CONTRACTSVIEW_FAILURE } from '../constants.js';

export default error => ({
    error,
    type: FETCH_CONTRACTSVIEW_FAILURE
});
