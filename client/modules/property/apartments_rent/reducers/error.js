import { FETCH_APARTMENTSRENT_FAILURE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_APARTMENTSRENT_FAILURE:
            return action.error;
        default:
            return state;
    }
}
