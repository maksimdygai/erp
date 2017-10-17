import { FETCH_LOGINPAGE_FAILURE } from '../constants.js';

export default function rejectAccounts(error) {
    return {
        type: FETCH_LOGINPAGE_FAILURE,
        error,
    };
}
