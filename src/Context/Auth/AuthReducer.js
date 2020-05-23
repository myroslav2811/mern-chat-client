import { SET_IS_AUTHENTICATED, SET_IS_LOADING, SET_USER } from '../types'

export const AuthReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_IS_AUTHENTICATED:
            return { ...state, isAuthenticated: payload };
        case SET_IS_LOADING:
            return { ...state, isLoading: payload };
        case SET_USER:
            return { ...state, user: payload };
        default:
            return state;
    }
}

export const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null
};