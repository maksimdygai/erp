import { FETCH_SYSTEMNOTES_FAILURE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_SYSTEMNOTES_FAILURE:
            return action.error;
        default:
            return state;
    }
}
