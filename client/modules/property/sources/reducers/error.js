import { FETCH_SOURCES_FAILURE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_SOURCES_FAILURE:
            return action.error;
        default:
            return state;
    }
}
