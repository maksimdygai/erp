import { FETCH_HOUSES_FAILURE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_HOUSES_FAILURE:
            return action.error;
        default:
            return state;
    }
}
