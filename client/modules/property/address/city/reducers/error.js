import { FETCH_CITIES_FAILURE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_CITIES_FAILURE:
            return action.error;
        default:
            return state;
    }
}
