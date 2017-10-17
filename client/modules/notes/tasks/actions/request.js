import { FETCH_TASKS_REQUEST } from '../constants.js';

export default isFetching => ({
    isFetching,
    type: FETCH_TASKS_REQUEST
});
