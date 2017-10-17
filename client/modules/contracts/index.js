import { combineReducers } from 'redux';
import exclusive from './contracts_exclusive/reducers';
import view from './contracts_view/reducers';

export default combineReducers({
    exclusive,
    view
});
