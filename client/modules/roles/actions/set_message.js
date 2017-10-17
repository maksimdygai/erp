import { SET_ROLESMESSAGE } from '../constants.js';

export default function receiveAccounts(data) {
	return {
		type: SET_ROLESMESSAGE,
		data,
	};
}
