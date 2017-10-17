import { combineReducers } from 'redux';
import isFetching from './is_fetching.js';
import data from './data.js';
import error from './error.js';

const accounts = combineReducers({
    isFetching,
    data,
    error
});

export default accounts;
