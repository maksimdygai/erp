import { VIEW_APARTMENTSELL } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case VIEW_APARTMENTSELL:
            return action.data;
        default:
            return state;
    }
}
