import { SET_MODAL_STATE } from '../constants.js';

export default function setModal(data) {
    return {
        type: SET_MODAL_STATE,
        data,
    };
}
