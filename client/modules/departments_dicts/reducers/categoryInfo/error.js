import { GET_CATEGORYINFO_FAILURE } from '../../constants.js';

export default function error(state = null, action) {
    switch (action.type) {
        case GET_CATEGORYINFO_FAILURE:
            return action.error;
        default:
            return state;
    }
}
