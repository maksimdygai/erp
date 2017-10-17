import { combineReducers } from 'redux';
import isFetching from './is_fetching.js';
import data from './data.js';
import error from './error.js';
import message from './message.js';
import view from './view.js';

const departments = combineReducers({
    data,
    error,
    isFetching,
    message,
    view
});

export default departments;
