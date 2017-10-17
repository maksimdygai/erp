import { FETCH_AUTH_SUCCESS } from '../constants.js';

export default function receiveAccounts(data) {
    return {
        type: FETCH_AUTH_SUCCESS,
        data,
    };
}
