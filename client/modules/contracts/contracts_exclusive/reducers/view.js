import { VIEW_CONTRACTEXCLUSIVE } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case VIEW_CONTRACTEXCLUSIVE:
            return action.data;
        default:
            return state;
    }
}
