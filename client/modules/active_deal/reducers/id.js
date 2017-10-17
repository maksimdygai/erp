import { SET_PROP_ID, ACTIVE_DEAL_RESET } from '../constants.js';

export default (state = '', action) => {
	switch (action.type) {
		case SET_PROP_ID:
			return action.id;
		case ACTIVE_DEAL_RESET:
			return '';
		default:
			return state;
	}
}
