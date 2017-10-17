import { combineReducers } from 'redux';
import categoryInfo from './categoryInfo';
import data from './data.js';
import error from './error.js';
import isFetching from './is_fetching.js';
import message from './message.js';
import position from './position';
import view from './view';

const categories = combineReducers({
    categoryInfo,
    data,
    error,
    isFetching,
    message,
    position,
    view
});

export default categories;
