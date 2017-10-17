import { EDIT_PROP_DESC, ACTIVE_DEAL_RESET } from '../constants.js';

export default (state = '', action) => {
	switch (action.type) {
		case EDIT_PROP_DESC:
			return action.prop_desc;
		case ACTIVE_DEAL_RESET:
			return '';
		default:
			return state;
	}
}
