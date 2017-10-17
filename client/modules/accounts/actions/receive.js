import { FETCH_ACCOUNTS_SUCCESS } from '../constants.js';

export default function receiveAccounts(data) {
    return {
        type: FETCH_ACCOUNTS_SUCCESS,
        data,
    };
}
