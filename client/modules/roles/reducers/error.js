import { FETCH_ROLES_FAILURE } from '../constants.js';

export default function error(state = false, action) {
	switch (action.type) {
		case FETCH_ROLES_FAILURE:
			return action.error;
		default:
			return state;
	}
}
