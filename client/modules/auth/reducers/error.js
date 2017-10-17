import { FETCH_AUTH_FAILURE } from '../constants.js';

const initialState = null;

export default function error(state = initialState, action) {
    switch (action.type) {
        case FETCH_AUTH_FAILURE:
            return action.error;
        default:
            return state;
    }
}
