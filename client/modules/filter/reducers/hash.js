import {FILTER_HASH} from '../constants.js';

export default (state = false, action) => {
    switch (action.type) {
        case FILTER_HASH:
            return action.data;
        default:
            return state;
    }
}
