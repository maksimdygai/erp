import { GET_POSITIONARR_REQUEST } from '../../constants.js';

export default isFetching => ({
    type: GET_POSITIONARR_REQUEST,
    isFetching,
});
