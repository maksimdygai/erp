import { VIEW_DEAL } from '../constants.js';

export default (state = null, action) => {
	switch (action.type) {
		case VIEW_DEAL:
			return action.data;
		default:
			return state;
	}
}
