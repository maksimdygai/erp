import { FETCH_CATEGORIES_SUCCESS, REMOVE_CATEGORY } from '../constants.js';

export default function data(state = null, action) {
    switch (action.type) {
        case FETCH_CATEGORIES_SUCCESS:
            return action.data;
        case REMOVE_CATEGORY:
            return action.data.filter(item => item.id !== action.id);
        default:
            return state;
    }
}
