import { SET_IS_AUTHENTICATED, SET_IS_LOADING, SET_USER, SET_SUCCESS_SIGNUP, SET_SIGNUP_ERROR, RESET, SET_SIGNIN_ERROR } from '../types'

export const AuthReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_IS_AUTHENTICATED:
            return { ...state, isAuthenticated: payload };
        case SET_IS_LOADING:
            return { ...state, isLoading: payload };
        case SET_USER:
            return { ...state, user: payload };
        case SET_SUCCESS_SIGNUP:
            return { ...state, successSignUp: payload };
        case SET_SIGNUP_ERROR:
            return { ...state, signUpError: payload };
        case RESET:
            return { ...initialState, isLoading: false };
        case SET_SIGNIN_ERROR:
            return { ...state, signInError: payload };
        default:
            return state;
    }
}

export const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
    successSignUp: false,
    signUpError: '',
    signInError: ''
};