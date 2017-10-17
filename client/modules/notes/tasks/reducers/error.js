import { FETCH_TASKS_FAILURE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_TASKS_FAILURE:
            return action.error;
        default:
            return state;
    }
}
