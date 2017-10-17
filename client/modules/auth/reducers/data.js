import { SET_AUTH } from '../constants.js';

const initialState = null;

export default function data(state = initialState, action) {
    switch (action.type) {
        case SET_AUTH:
            return action.data;
        default:
            return state;
    }
}
