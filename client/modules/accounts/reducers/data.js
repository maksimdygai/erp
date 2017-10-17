import { FETCH_ACCOUNTS_SUCCESS } from '../constants.js';

const initialState = null;

export default function data(state = initialState, action) {
    switch (action.type) {
        case FETCH_ACCOUNTS_SUCCESS:
            return action.data;
        default:
            return state;
    }
}
