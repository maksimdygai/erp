import { SET_USER_DATA } from '../constants.js';

export default function data(state = null, action) {
	switch (action.type) {
        case SET_USER_DATA:
            return action.data;
        default:
            return state;
    }
}
