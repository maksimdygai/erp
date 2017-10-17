import { SET_DEPARTMENTSMANAGEMESSAGE } from '../constants.js';

export default function data(state = null, action) {
    switch (action.type) {
        case SET_DEPARTMENTSMANAGEMESSAGE:
            return action.data;
        default:
            return state;
    }
}
