import { FETCH_SYSTEMNOTES_REQUEST } from '../constants.js';

export default (state = false, action) => {
    switch (action.type) {
        case FETCH_SYSTEMNOTES_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
