import { FETCH_LOGINPAGE_REQUEST } from '../constants.js';

export default function requestAccounts(isFetching) {
    return {
        type: FETCH_LOGINPAGE_REQUEST,
        isFetching,
    };
}
