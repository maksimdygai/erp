import { FILTER_FAILURE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FILTER_FAILURE:
            return {
            	...state,
            	[action.key]: action.error
            };
        default:
            return state;
    }
}
