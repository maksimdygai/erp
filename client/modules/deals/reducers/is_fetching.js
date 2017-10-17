import { FETCH_DEALS_REQUEST } from '../constants.js';

export default (state = false, action) => {
    switch (action.type) {
        case FETCH_DEALS_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
