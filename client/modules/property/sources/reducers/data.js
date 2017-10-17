import { FETCH_SOURCES_SUCCESS, REMOVE_SOURCE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_SOURCES_SUCCESS:
            return action.data;
        case REMOVE_SOURCE:
            return action.data.filter(item => item.id !== action.id);
        default:
            return state;
    }
}
