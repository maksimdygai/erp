import { SET_AUTH } from '../constants.js';

export default function rejectAccounts(data) {
    return {
        type: SET_AUTH,
        data,
    };
}
