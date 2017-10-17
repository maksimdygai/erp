import { SET_MODAL_STATE } from '../constants.js';

const initialState = "enter";

export default function data(state = initialState, action) {
	switch (action.type) {
        case SET_MODAL_STATE:
            return action.data;
        default:
            return state;
    }
}
