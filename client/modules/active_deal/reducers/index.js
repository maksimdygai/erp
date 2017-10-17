import { combineReducers } from 'redux';
import id from './id.js';
import prop_list from './prop_list.js';
import prop_type from './prop_type.js';
import text from './text.js';

export default combineReducers({
	id,
	prop_list,
	prop_type,
	text
});
