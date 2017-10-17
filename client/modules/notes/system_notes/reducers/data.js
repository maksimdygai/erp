import { FETCH_SYSTEMNOTES_SUCCESS } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_SYSTEMNOTES_SUCCESS:
            return action.data;
        default:
            return state;
    }
}
