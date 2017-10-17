import { EDIT_PROP_TYPE, ACTIVE_DEAL_RESET } from '../constants.js';

export default (state = '', action) => {
	switch (action.type) {
		case EDIT_PROP_TYPE:
			return action.prop_type;
		case ACTIVE_DEAL_RESET:
			return '';
		default:
			return state;
	}
}
