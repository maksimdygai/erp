import { FETCH_APARTMENTSSELL_SUCCESS, REMOVE_APARTMENTSELL } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_APARTMENTSSELL_SUCCESS:
            return action.data;
        case REMOVE_APARTMENTSELL:
            return action.data.filter(item => item.id !== action.id);
        default:
            return state;
    }
}
