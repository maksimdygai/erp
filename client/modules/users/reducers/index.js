import { combineReducers } from 'redux';
import isFetching from './is_fetching.js';
import data from './data.js';
import error from './error.js';
import view from './view.js';

const users = combineReducers({
    data,
    error,
    isFetching,
    view
});

export default users;
