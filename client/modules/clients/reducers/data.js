import { FETCH_CLIENTS_SUCCESS, REMOVE_CLIENT } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_CLIENTS_SUCCESS:
            return action.data;
        case REMOVE_CLIENT:
            return action.data.filter(item => item.id !== action.id);
        default:
            return state;
    }
}
