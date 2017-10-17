import { FETCH_LOTS_SUCCESS, REMOVE_LOT } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_LOTS_SUCCESS:
            return action.data;
        case REMOVE_LOT:
            return action.data.filter(item => item.id !== action.id);
        default:
            return state;
    }
}
