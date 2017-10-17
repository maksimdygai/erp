import { VIEW_ROLE } from '../constants.js';

export default (state = null, action) => {
	switch (action.type) {
		case VIEW_ROLE:
			return action.data;
		default:
			return state;
	}
}
