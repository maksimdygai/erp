import { FETCH_LOGINPAGE_REQUEST } from '../constants.js';

const initialState = false;

export default function isFetching(state = initialState, action) {
    switch (action.type) {
        case FETCH_LOGINPAGE_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
