import { VIEW_SOURCE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case VIEW_SOURCE:
            return action.data;
        default:
            return state;
    }
}
