import { FETCH_OFFICES_SUCCESS, REMOVE_OFFICE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_OFFICES_SUCCESS:
            return action.data;
        case REMOVE_OFFICE:
            return action.data.filter(item => item.id !== action.id);
        default:
            return state;
    }
}
