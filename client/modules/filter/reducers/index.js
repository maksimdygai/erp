import { combineReducers } from 'redux';
import data from './data.js';
import error from './error.js';
import hash from './hash.js';
import isFetching from './is_fetching.js';

const 
	units = combineReducers({
	    data,
	    error,
	    hash,
	    isFetching
	});

export default units;