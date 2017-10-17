import { GET_CATEGORYINFO_REQUEST } from '../../constants.js';

export default function isFetching(state = false, action) {
    switch (action.type) {
        case GET_CATEGORYINFO_REQUEST:
            return action.isFetching;
        default:
            return state;
    }
}
