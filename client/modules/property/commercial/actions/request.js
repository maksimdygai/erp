import { FETCH_COMMERCIAL_PROPERTY_REQUEST } from '../constants.js';

export default isFetching => ({
    isFetching,
    type: FETCH_COMMERCIAL_PROPERTY_REQUEST
});
