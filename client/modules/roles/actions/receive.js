import { FETCH_ROLES_SUCCESS } from '../constants.js';

export default function receiveAccounts(data) {
	return {
		type: FETCH_ROLES_SUCCESS,
		data,
	};
}
