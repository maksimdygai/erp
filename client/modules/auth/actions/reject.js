import { FETCH_AUTH_FAILURE } from '../constants.js';

export default function rejectAccounts(error) {
    return {
        type: FETCH_AUTH_FAILURE,
        error,
    };
}
