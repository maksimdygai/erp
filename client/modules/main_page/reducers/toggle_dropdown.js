import { TOGGLE_DROPDOWN } from '../constants.js';

const
	initialState = false;

export default function isDropdownOpen(state = initialState, action) {
	switch (action.type) {
        case TOGGLE_DROPDOWN:
            return !action.state;
        default:
            return state;
    }
}
