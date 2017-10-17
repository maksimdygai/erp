import { FETCH_SUMMARY_FAILURE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_SUMMARY_FAILURE:
            return action.error;
        default:
            return state;
    }
}
