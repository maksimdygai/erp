import { FETCH_DEALS_FAILURE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_DEALS_FAILURE:
            return action.error;
        default:
            return state;
    }
}
