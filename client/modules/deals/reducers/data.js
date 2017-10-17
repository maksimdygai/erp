import { FETCH_DEALS_SUCCESS, REMOVE_DEAL } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_DEALS_SUCCESS:
            return action.data;
        case REMOVE_DEAL:
            return action.data.filter(item => item.id !== action.id);
        default:
            return state;
    }
}
