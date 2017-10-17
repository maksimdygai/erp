import { FETCH_CONTRACTSVIEW_FAILURE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_CONTRACTSVIEW_FAILURE:
            return action.error;
        default:
            return state;
    }
}
