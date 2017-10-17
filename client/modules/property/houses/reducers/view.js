import { VIEW_HOUSE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case VIEW_HOUSE:
            return action.data;
        default:
            return state;
    }
}
