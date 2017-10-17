import { FETCH_ACCOUNTS_FAILURE } from '../constants.js';

export default function rejectAccounts(error) {
    return {
        type: FETCH_ACCOUNTS_FAILURE,
        error,
    };
}
