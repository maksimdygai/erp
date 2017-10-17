import { FETCH_OFFICES_REQUEST } from '../constants.js';

export default (state = false, action) => {
    switch (action.type) {
        case FETCH_OFFICES_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
