import { FILTER_REQUEST } from '../constants.js';

export default (state = false, action) => {
    switch (action.type) {
        case FILTER_REQUEST:
            return {
            	...state,
            	[action.key]: action.isFetching
            };
        default:
            return state;
    }
}
