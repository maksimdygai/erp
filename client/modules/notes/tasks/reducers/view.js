import { VIEW_TASK } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case VIEW_TASK:
            return action.data;
        default:
            return state;
    }
}
