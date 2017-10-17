import { FETCH_UNITS_REQUEST } from '../constants.js';

export default (state = false, action) => {
    switch (action.type) {
        case FETCH_UNITS_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
