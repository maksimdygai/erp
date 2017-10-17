import { combineReducers } from 'redux';
import city from './city/reducers';
import house from './house/reducers';
import street from './street/reducers';
import addressById from './address_by_id/reducers';

export default combineReducers({
    city,
    house,
    street,
    addressById
});
