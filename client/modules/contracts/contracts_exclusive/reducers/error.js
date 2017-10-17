import { FETCH_CONTRACTSEXCLUSIVE_FAILURE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_CONTRACTSEXCLUSIVE_FAILURE:
            return action.error;
        default:
            return state;
    }
}
