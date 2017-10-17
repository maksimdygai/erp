import { FETCH_APARTMENTSSELL_REQUEST } from '../constants.js';

export default (state = false, action) => {
    switch (action.type) {
        case FETCH_APARTMENTSSELL_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
