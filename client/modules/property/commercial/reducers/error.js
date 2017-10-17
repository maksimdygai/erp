import { FETCH_COMMERCIAL_PROPERTY_FAILURE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_COMMERCIAL_PROPERTY_FAILURE:
            return action.error;
        default:
            return state;
    }
}
