import { FETCH_SOURCES_REQUEST } from '../constants.js';

export default (state = false, action) => {
    switch (action.type) {
        case FETCH_SOURCES_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
