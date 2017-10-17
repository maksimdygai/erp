import { FETCH_COMMERCIAL_PROPERTY_SUCCESS, REMOVE_COMMERCIAL_PROPERTY } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_COMMERCIAL_PROPERTY_SUCCESS:
            return action.data;
        case REMOVE_COMMERCIAL_PROPERTY:
            return action.data.filter(item => item.id !== action.id);
        default:
            return state;
    }
}
