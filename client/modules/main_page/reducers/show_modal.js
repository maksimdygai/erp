import {SHOW_MODAL} from '../constants.js';

export default (state = false, action) => {
	switch (action.type) {
        case SHOW_MODAL:
            return {
            	...state,
            	[action.key]: action.state
            };
            
        default:
            return state;
    }
}
