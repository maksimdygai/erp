import { FETCH_HOUSES_SUCCESS } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_HOUSES_SUCCESS:
            return action.data;
        default:
            return state;
    }
}
