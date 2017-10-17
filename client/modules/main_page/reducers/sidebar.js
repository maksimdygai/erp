import { SET_MAINPAGE_SIDEBAR } from '../constants.js';

const initialState = false;

export default function data(state = initialState, action) {
	switch (action.type) {
        case SET_MAINPAGE_SIDEBAR:
            return action.data;
        default:
            return state;
    }
}
