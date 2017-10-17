import { FETCH_USER_INFO_SUCCESS } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_USER_INFO_SUCCESS:
            return action.data;
        default:
            return state;
    }
}
