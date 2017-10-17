import { combineReducers } from 'redux';
import address from './address';
import apartments_rent from './apartments_rent/reducers';
import apartments_sell from './apartments_sell/reducers';
import commercial from './commercial/reducers';
import houses from './houses/reducers';
import lots from './lots/reducers';
import sources from './sources/reducers';

export default combineReducers({
    address,
    apartments_rent,
    apartments_sell,
    commercial,
    houses,
    lots,
    sources
});
