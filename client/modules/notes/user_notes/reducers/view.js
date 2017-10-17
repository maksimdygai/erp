import { VIEW_USERNOTE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case VIEW_USERNOTE:
            return action.data;
        default:
            return state;
    }
}
