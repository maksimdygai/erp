import { FETCH_APARTMENTSRENT_REQUEST } from '../constants.js';

export default (state = false, action) => {
    switch (action.type) {
        case FETCH_APARTMENTSRENT_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
