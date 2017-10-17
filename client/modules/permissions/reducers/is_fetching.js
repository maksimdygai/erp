import { FETCH_PERMISSIONS_REQUEST } from '../constants.js';

export default (state = false, action) => {
    switch (action.type) {
        case FETCH_PERMISSIONS_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
