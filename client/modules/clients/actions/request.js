import { FETCH_CLIENTS_REQUEST } from '../constants.js';

export default isFetching => ({
    isFetching,
    type: FETCH_CLIENTS_REQUEST
});