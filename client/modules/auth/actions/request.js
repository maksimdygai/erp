import { FETCH_AUTH_REQUEST } from '../constants.js';

export default function requestAccounts(isFetching) {
    return {
        type: FETCH_AUTH_REQUEST,
        isFetching,
    };
}
