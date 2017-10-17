import { VIEW_APARTMENTRENT } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case VIEW_APARTMENTRENT:
            return action.data;
        default:
            return state;
    }
}
