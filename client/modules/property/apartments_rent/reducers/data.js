import { FETCH_APARTMENTSRENT_SUCCESS, REMOVE_APARTMENTRENT } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_APARTMENTSRENT_SUCCESS:
            return action.data;
        case REMOVE_APARTMENTRENT:
            return action.data.filter(item => item.id !== action.id);
        default:
            return state;
    }
}
