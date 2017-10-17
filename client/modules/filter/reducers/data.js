import { FILTER_SUCCESS } from '../constants.js';

export default (state = {}, action) => {
    switch (action.type) {
        case FILTER_SUCCESS:
            return {
            	...state,
            	[action.key]: action.data
            };
        default:
            return state;
    }
}
