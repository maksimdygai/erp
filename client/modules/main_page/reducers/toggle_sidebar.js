import { TOGGLE_SIDEBAR } from '../constants.js';

const
	initialState = false;

export default function isSidebarOpen(state = initialState, action) {
	switch (action.type) {
        case TOGGLE_SIDEBAR:
            return !action.state;
        default:
            return state;
    }
}
