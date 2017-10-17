import { FETCH_DEPARTMENTS_DICTS_SUCCESS } from '../constants.js';

export default function data(state = null, action) {
    switch (action.type) {
        case FETCH_DEPARTMENTS_DICTS_SUCCESS:
            return action.data;
        default:
            return state;
    }
}
