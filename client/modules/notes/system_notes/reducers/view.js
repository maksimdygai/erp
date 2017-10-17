import { VIEW_SYSTEMNOTE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case VIEW_SYSTEMNOTE:
            return action.data;
        default:
            return state;
    }
}
