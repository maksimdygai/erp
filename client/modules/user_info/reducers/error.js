import { FETCH_USER_INFO_FAILURE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_USER_INFO_FAILURE:
            return action.error;
        default:
            return state;
    }
}
