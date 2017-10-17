import { FETCH_ROLES_REQUEST } from '../constants.js';

export default function requestAccounts(isFetching) {
	return {
		type: FETCH_ROLES_REQUEST,
		isFetching,
	};
}
