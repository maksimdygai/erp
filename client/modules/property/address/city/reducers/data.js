import { FETCH_CITIES_SUCCESS } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_CITIES_SUCCESS:
            return action.data;
        default:
            return state;
    }
}
