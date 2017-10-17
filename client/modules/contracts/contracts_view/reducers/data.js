import { FETCH_CONTRACTSVIEW_SUCCESS, REMOVE_CONTRACTVIEW } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_CONTRACTSVIEW_SUCCESS:
            return action.data;
        case REMOVE_CONTRACTVIEW:
            return action.data.filter(item => item.id !== action.id);
        default:
            return state;
    }
}
