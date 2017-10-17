import { FETCH_LOGINPAGE_SUCCESS } from '../constants.js';

export default function receiveAccounts(data) {
    return {
        type: FETCH_LOGINPAGE_SUCCESS,
        data,
    };
}
