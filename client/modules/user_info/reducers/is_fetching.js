import { FETCH_USER_INFO_REQUEST } from '../constants.js';

export default (state = false, action) => {
    switch (action.type) {
        case FETCH_USER_INFO_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
