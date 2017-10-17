import { FETCH_USERS_SUCCESS, DELETE_USER } from '../constants.js';

export default function data(state = null, action) {
    switch (action.type) {
        case FETCH_USERS_SUCCESS:
            return action.data;
        case DELETE_USER:
            return action.data.filter(item => item.id !== action.id);
        default:
            return state;
    }
}
