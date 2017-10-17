import { VIEW_LOT } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case VIEW_LOT:
            return action.data;
        default:
            return state;
    }
}
