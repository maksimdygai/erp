import { FETCH_STREETS_FAILURE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_STREETS_FAILURE:
            return action.error;
        default:
            return state;
    }
}
