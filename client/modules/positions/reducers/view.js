import { VIEW_POSITION } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case VIEW_POSITION:
            return action.data;
        default:
            return state;
    }
}
