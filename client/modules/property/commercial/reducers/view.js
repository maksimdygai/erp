import { VIEW_COMMERCIAL_PROPERTY } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case VIEW_COMMERCIAL_PROPERTY:
            return action.data;
        default:
            return state;
    }
}
