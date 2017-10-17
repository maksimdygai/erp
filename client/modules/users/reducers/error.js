import { FETCH_USERS_FAILURE } from '../constants.js';

export default function error(state = null, action) {
    switch (action.type) {
        case FETCH_USERS_FAILURE:
            return action.error;
        default:
            return state;
    }
}
