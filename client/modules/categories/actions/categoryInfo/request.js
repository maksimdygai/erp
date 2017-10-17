import { GET_CATEGORYINFO_REQUEST } from '../../constants.js';

export default isFetching => ({
    type: GET_CATEGORYINFO_REQUEST,
    isFetching,
});
