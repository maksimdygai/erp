import { FETCH_SOURCES_REQUEST } from '../constants.js';

export default isFetching => ({
    isFetching,
    type: FETCH_SOURCES_REQUEST
});
