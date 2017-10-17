import { FETCH_USERNOTES_SUCCESS, POST_USERNOTE, REMOVE_USERNOTE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case FETCH_USERNOTES_SUCCESS:
            return action.data;
        case POST_USERNOTE:
            return action.data;
        case REMOVE_USERNOTE:
            return action.data.filter(item => item.id !== action.id);
        default:
            return state;
    }
}
