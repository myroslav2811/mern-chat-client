import { SET_DIALOGS, SET_DIALOG, SET_RECEIVER, SET_FILTERED, SET_IS_LOADING, ADD_DIALOG } from '../types'

export const DialogsReducer = (state, action) => {

    const { type, payload } = action;

    switch (type) {
        case SET_DIALOGS:
            return { ...state, dialogs: payload };
        case SET_DIALOG:
            return { ...state, dialog: payload };
        case SET_RECEIVER:
            return { ...state, receiver: payload };
        case SET_FILTERED:
            return { ...state, filtered: payload };
        case SET_IS_LOADING:
            return { ...state, isLoading: payload };
        case ADD_DIALOG:
            const items = state.dialogs.filter(item => item._id !== payload._id);
            const filteredItems = state.filtered.filter(item => item._id !== payload._id);
            return { ...state, dialogs: [payload, ...items], filtered: [payload, ...filteredItems] };
        default:
            return state;
    }
}

export const initialValue = {
    dialogs: [],
    dialog: null,
    receiver: null,
    filtered: [],
    isLoading: false
}