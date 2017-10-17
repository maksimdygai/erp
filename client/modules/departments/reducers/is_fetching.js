import { FETCH_DEPARTMENTS_REQUEST } from '../constants.js';

export default function isFetching(state = false, action) {
    switch (action.type) {
        case FETCH_DEPARTMENTS_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
