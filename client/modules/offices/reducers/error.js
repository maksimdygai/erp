import { FETCH_OFFICES_FAILURE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_OFFICES_FAILURE:
            return action.error;
        default:
            return state;
    }
}
