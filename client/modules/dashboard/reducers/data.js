import {FETCH_SUMMARY_SUCCESS} from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_SUMMARY_SUCCESS:
            return action.data;
        default:
            return state;
    }
}
