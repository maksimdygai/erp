import { FETCH_ADDRESS_BY_ID_REQUEST } from '../constants.js';

export default isFetching => ({
    isFetching,
    type: FETCH_ADDRESS_BY_ID_REQUEST
});
