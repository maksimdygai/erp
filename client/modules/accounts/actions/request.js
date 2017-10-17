import { FETCH_ACCOUNTS_REQUEST } from '../constants.js';

export default function requestAccounts(isFetching) {
    return {
        type: FETCH_ACCOUNTS_REQUEST,
        isFetching,
    };
}
