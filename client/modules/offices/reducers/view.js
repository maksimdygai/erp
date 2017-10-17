import { VIEW_OFFICE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case VIEW_OFFICE:
            return action.data;
        default:
            return state;
    }
}
