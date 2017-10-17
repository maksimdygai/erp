import { FETCH_SUMMARY_REQUEST } from '../constants.js';

export default (state = false, action) => {
    switch (action.type) {
        case FETCH_SUMMARY_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
