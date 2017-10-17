import { FETCH_HOUSES_SUCCESS, REMOVE_HOUSE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_HOUSES_SUCCESS:
            return action.data;
        case REMOVE_HOUSE:
            return action.data.filter(item => item.id !== action.id);
        default:
            return state;
    }
}
