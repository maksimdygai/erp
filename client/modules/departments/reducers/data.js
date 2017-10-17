import { FETCH_DEPARTMENTS_SUCCESS, REMOVE_DEPARTMENT } from '../constants.js';

export default function data(state = null, action) {
    switch (action.type) {
        case FETCH_DEPARTMENTS_SUCCESS:
            return action.data;
        case REMOVE_DEPARTMENT:
            return action.data.filter(item => item.id !== action.id);
        default:
            return state;
    }
}
