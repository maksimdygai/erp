import { VIEW_CLIENT } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case VIEW_CLIENT:
            return action.data;
        default:
            return state;
    }
}
