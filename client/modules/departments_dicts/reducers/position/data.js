import { GET_POSITIONARR_SUCCESS } from '../../constants.js';

export default function data(state = null, action) {
    switch (action.type) {
        case GET_POSITIONARR_SUCCESS:
            return action.data;
        default:
            return state;
    }
}
