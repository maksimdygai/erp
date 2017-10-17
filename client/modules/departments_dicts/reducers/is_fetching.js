import { FETCH_DEPARTMENTS_DICTS_REQUEST } from '../constants.js';

export default function isFetching(state = false, action) {
    switch (action.type) {
        case FETCH_DEPARTMENTS_DICTS_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
