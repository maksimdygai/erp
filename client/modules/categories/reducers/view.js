import { VIEW_CATEGORY } from '../constants.js';

export default (state = null, action) => {
	switch (action.type) {
		case VIEW_CATEGORY:
			return action.data;
		default:
			return state;
	}
}
