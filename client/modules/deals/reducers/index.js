import { combineReducers } from 'redux';
import data from './data.js';
import error from './error.js';
import isFetching from './is_fetching.js';
import view from './view.js';

export default combineReducers({
	data,
	error,
	isFetching,
	view
});