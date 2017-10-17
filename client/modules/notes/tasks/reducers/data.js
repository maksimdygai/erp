import { FETCH_TASKS_SUCCESS, POST_TASK, REMOVE_TASK } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_TASKS_SUCCESS:
            return action.data;
        case POST_TASK:
            return action.data;
        case REMOVE_TASK:
            return action.data.filter(item => item.id !== action.id);
        default:
            return state;
    }
}
