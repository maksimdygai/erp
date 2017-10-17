import { FETCH_UNITS_SUCCESS, REMOVE_UNIT } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_UNITS_SUCCESS:
            return action.data;
        case REMOVE_UNIT:
            return action.data.filter(item => item.id !== action.id);
        default:
            return state;
    }
}
