import { SET_PROP_LIST, CLEAR_PROP_LIST, ACTIVE_DEAL_RESET } from '../constants.js';

export default (state = [], action) => {
	switch (action.type) {
		case SET_PROP_LIST:
			return action.list;
		case CLEAR_PROP_LIST:
			return [];
		case ACTIVE_DEAL_RESET:
			return [];
		default:
			return state;
	}
}
