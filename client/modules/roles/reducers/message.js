import { SET_ROLESMESSAGE } from '../constants.js';

const initialState = null;

export default function data(state = initialState, action) {
	switch (action.type) {
		case SET_ROLESMESSAGE:
			return action.data;
		default:
			return state;
	}
}
