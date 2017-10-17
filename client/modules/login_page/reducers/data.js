import { FETCH_LOGINPAGE_SUCCESS } from '../constants.js';

const initialState = null;

export default function data(state = initialState, action) {
	switch (action.type) {
        case FETCH_LOGINPAGE_SUCCESS:
            return action.data;
        default:
            return state;
    }
}
