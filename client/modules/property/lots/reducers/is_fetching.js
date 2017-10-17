import { FETCH_LOTS_REQUEST } from '../constants.js';

export default (state = false, action) => {
    switch (action.type) {
        case FETCH_LOTS_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
