import { FETCH_COMMERCIAL_PROPERTY_REQUEST } from '../constants.js';

export default (state = false, action) => {
    switch (action.type) {
        case FETCH_COMMERCIAL_PROPERTY_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
