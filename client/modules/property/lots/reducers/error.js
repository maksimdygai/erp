import { FETCH_LOTS_FAILURE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_LOTS_FAILURE:
            return action.error;
        default:
            return state;
    }
}
