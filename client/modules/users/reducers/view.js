import { VIEW_USER } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case VIEW_USER:
            return action.data;
        default:
            return state;
    }
}
