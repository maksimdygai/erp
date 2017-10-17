import { FETCH_CITIES_REQUEST } from '../constants.js';

export default isFetching => ({
    isFetching,
    type: FETCH_CITIES_REQUEST
});
