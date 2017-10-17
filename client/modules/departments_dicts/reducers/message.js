import { SET_CATEGORYMESSAGE } from '../constants.js';

export default function data(state = null, action) {
    switch (action.type) {
        case SET_CATEGORYMESSAGE:
            return action.data;
        default:
            return state;
    }
}
