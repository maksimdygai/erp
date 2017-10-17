import { FETCH_ROLES_FAILURE } from '../constants.js';

export default function rejectAccounts(error) {
	return {
		type: FETCH_ROLES_FAILURE,
		error,
	};
}
