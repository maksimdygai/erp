import { FETCH_POSITIONS_SUCCESS, REMOVE_POSITION } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_POSITIONS_SUCCESS:
            return action.data;
        case REMOVE_POSITION:
            return action.data.filter(item => item.id !== action.id);
        default:
            return state;
    }
}
