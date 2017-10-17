import { VIEW_DEPARTMENT } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case VIEW_DEPARTMENT:
            return action.data;
        default:
            return state;
    }
}
