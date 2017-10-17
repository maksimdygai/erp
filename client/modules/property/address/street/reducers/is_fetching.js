import { FETCH_STREETS_REQUEST } from '../constants.js';

export default (state = false, action) => {
    switch (action.type) {
        case FETCH_STREETS_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
