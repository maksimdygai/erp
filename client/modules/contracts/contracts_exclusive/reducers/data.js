import { FETCH_CONTRACTSEXCLUSIVE_SUCCESS, REMOVE_CONTRACTEXCLUSIVE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_CONTRACTSEXCLUSIVE_SUCCESS:
            return action.data;
        case REMOVE_CONTRACTEXCLUSIVE:
            return action.data.filter(item => item.id !== action.id);
        default:
            return state;
    }
}
