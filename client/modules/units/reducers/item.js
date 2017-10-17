import { VIEW_UNIT } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case VIEW_UNIT:
            return action.data;
        default:
            return state;
    }
}
