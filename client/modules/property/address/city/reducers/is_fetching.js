import { FETCH_CITIES_REQUEST } from '../constants.js';

export default (state = false, action) => {
    switch (action.type) {
        case FETCH_CITIES_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
