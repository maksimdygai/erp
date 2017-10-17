import { combineReducers } from 'redux';
import data from './data.js';
import error from './error.js';
import isFetching from './is_fetching.js';
import item from './item.js';

const 
	units = combineReducers({
	    data,
	    error,
	    isFetching,
	    item
	});

export default units;