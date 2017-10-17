import { FETCH_CLIENTS_REQUEST } from '../constants.js';

export default (state = false, action) => {
    switch (action.type) {
        case FETCH_CLIENTS_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
