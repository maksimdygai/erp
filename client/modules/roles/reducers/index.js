import { combineReducers } from 'redux';
import data from './data.js';
import error from './error.js';
import isFetching from './is_fetching.js';
import message from './message.js';
import view from './view.js';

const roles = combineReducers({
	data,
	error,
	isFetching,
	message,
	view
});

export default roles;
