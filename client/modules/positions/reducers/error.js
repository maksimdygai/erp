import { FETCH_POSITIONS_FAILURE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_POSITIONS_FAILURE:
            return action.error;
        default:
            return state;
    }
}
