import { FETCH_LOGINPAGE_FAILURE } from '../constants.js';

const initialState = null;

export default function error(state = initialState, action) {
    switch (action.type) {
        case FETCH_LOGINPAGE_FAILURE:
            return action.error;
        default:
            return state;
    }
}
