import { FETCH_ADDRESS_BY_ID_FAILURE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_ADDRESS_BY_ID_FAILURE:
            return action.error;
        default:
            return state;
    }
}
