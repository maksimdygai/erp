import { FETCH_ADDRESS_BY_ID_SUCCESS } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_ADDRESS_BY_ID_SUCCESS:
            return action.data;
        default:
            return state;
    }
}
