import { combineReducers } from 'redux';
import isFetching from './is_fetching.js';
import categoryInfo from './categoryInfo';
import data from './data.js';
import error from './error.js';
import message from './message.js';
import position from './position';
import view from './view';

const departments_dicts = combineReducers({
    categoryInfo,
    data,
    error,
    isFetching,
    message,
    position,
    view
});

export default departments_dicts;
