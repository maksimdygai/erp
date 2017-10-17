import { TOGGLE_COLLAPSABLE } from '../constants.js';

export default (key, state) => ({
	key,
    state,
    type: TOGGLE_COLLAPSABLE
});
