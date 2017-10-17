import { FETCH_DEPARTMENTS_DICTS_FAILURE } from '../constants.js';

export default function error(state = null, action) {
    switch (action.type) {
        case FETCH_DEPARTMENTS_DICTS_FAILURE:
            return action.error;
        default:
            return state;
    }
}
