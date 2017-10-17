import { VIEW_DEPARTMENT_DICT } from '../constants.js';

export default (state = null, action) => {
    switch (action.type) {
        case VIEW_DEPARTMENT_DICT:
            return action.data;
        default:
            return state;
    }
}
