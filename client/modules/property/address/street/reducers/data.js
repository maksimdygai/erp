import { FETCH_STREETS_SUCCESS } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_STREETS_SUCCESS:
            return action.data;
        default:
            return state;
    }
}
