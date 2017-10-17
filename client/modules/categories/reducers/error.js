import { FETCH_CATEGORIES_FAILURE } from '../constants.js';

export default function error(state = null, action) {
    switch (action.type) {
        case FETCH_CATEGORIES_FAILURE:
            return action.error;
        default:
            return state;
    }
}
