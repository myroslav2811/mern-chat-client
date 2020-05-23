import { GET_MESSAGES, PUSH_NEW_MESSAGE, SET_IS_LOADING } from '../types'

export const MessagesReducer = (state, action) => {

    const { type, payload } = action;

    switch (type) {
        case GET_MESSAGES:
            return { ...state, messages: payload };
        case PUSH_NEW_MESSAGE:
            return { ...state, messages: [...state.messages, payload] };
        case SET_IS_LOADING:
            return { ...state, isLoading: payload }
        default:
            return state;
    }
}

export const initialValue = {
    messages: [],
    isLoading: false
}