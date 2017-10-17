import { FETCH_HOUSES_REQUEST } from '../constants.js';

export default (state = false, action) => {
    switch (action.type) {
        case FETCH_HOUSES_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
