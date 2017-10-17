import { FETCH_ROLES_SUCCESS, REMOVE_ROLE } from '../constants.js';

export default function data(state = null, action) {
	switch (action.type) {
		case FETCH_ROLES_SUCCESS:
			return action.data;
		case REMOVE_ROLE:
			return action.data.filter(item => item.id !== action.id);
		default:
			return state;
	}
}
