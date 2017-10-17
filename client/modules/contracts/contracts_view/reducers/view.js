import { VIEW_CONTRACTVIEW } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case VIEW_CONTRACTVIEW:
            return action.data;
        default:
            return state;
    }
}
