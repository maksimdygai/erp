import { SET_MAINPAGE_DATA } from '../constants.js';

const initialState = null;

export default function data(state = initialState, action) {
	switch (action.type) {
        case SET_MAINPAGE_DATA:
            return action.data;
        default:
            return state;
    }
}
