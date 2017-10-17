import { FETCH_USERNOTES_REQUEST } from '../constants.js';

export default (state = false, action) => {
    switch (action.type) {
        case FETCH_USERNOTES_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
