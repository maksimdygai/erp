import { TOGGLE_COLLAPSABLE } from '../constants.js';

export default (state = false, action) => {
	switch (action.type) {
        case TOGGLE_COLLAPSABLE:
            return {
            	...state,
            	[action.key]: !action.state
            };
            
        default:
            return state;
    }
}
