import { FETCH_UNITS_FAILURE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_UNITS_FAILURE:
            return action.error;
        default:
            return state;
    }
}
