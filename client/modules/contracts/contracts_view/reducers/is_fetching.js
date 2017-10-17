import { FETCH_CONTRACTSVIEW_REQUEST } from '../constants.js';

export default (state = false, action) => {
    switch (action.type) {
        case FETCH_CONTRACTSVIEW_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
