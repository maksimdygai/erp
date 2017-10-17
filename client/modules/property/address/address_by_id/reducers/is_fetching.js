import { FETCH_ADDRESS_BY_ID_REQUEST } from '../constants.js';

export default (state = false, action) => {
    switch (action.type) {
        case FETCH_ADDRESS_BY_ID_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
