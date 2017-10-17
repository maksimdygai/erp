import { FETCH_CLIENTS_FAILURE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_CLIENTS_FAILURE:
            return action.error;
        default:
            return state;
    }
}
