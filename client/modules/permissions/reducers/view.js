import { VIEW_PERMISSION } from '../constants.js';

export default (state = null, action) => {
	switch (action.type) {
		case VIEW_PERMISSION:
			return action.data;
		default:
			return state;
	}
}
