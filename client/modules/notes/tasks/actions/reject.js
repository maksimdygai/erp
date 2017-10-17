import { FETCH_TASKS_FAILURE } from '../constants.js';

export default error => ({
    error,
    type: FETCH_TASKS_FAILURE
});
