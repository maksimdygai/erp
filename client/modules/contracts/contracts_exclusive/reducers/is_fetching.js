import { FETCH_CONTRACTSEXCLUSIVE_REQUEST } from '../constants.js';

export default (state = false, action) => {
    switch (action.type) {
        case FETCH_CONTRACTSEXCLUSIVE_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
