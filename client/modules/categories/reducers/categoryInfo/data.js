import { GET_CATEGORYINFO_SUCCESS } from '../../constants.js';

export default function data(state = null, action) {
    switch (action.type) {
        case GET_CATEGORYINFO_SUCCESS:
            return action.data;
        default:
            return state;
    }
}
