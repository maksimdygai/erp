import { FETCH_PERMISSIONS_SUCCESS, REMOVE_PERMISSION } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_PERMISSIONS_SUCCESS:
            return action.data;
        case REMOVE_PERMISSION:
            return action.data.filter(item => item.id !== action.id);
        default:
            return state;
    }
}
