import { FETCH_POSITIONS_REQUEST } from '../constants.js';

export default (state = false, action) => {
    switch (action.type) {
        case FETCH_POSITIONS_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
