import { FETCH_ACCOUNTS_REQUEST } from '../constants.js';

const initialState = false;

export default function isFetching(state = initialState, action) {
    switch (action.type) {
        case FETCH_ACCOUNTS_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
