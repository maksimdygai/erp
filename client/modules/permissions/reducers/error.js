import { FETCH_PERMISSIONS_FAILURE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_PERMISSIONS_FAILURE:
            return action.error;
        default:
            return state;
    }
}
