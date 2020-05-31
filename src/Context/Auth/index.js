import React, { useEffect, useReducer } from 'react'
import { checkIsAuthenticated, authSignUp, authLogin, authLogout } from '../../services/auth.js'
import { AuthReducer, initialState } from './AuthReducer';
import { SET_IS_AUTHENTICATED, SET_IS_LOADING, SET_USER, SET_SUCCESS_SIGNUP, SET_SIGNUP_ERROR, RESET, SET_SIGNIN_ERROR } from '../types'

export const AuthContext = React.createContext({})

export const Auth = ({ children }) => {

    const [state, dispatch] = useReducer(AuthReducer, initialState);
    const { isAuthenticated, isLoading, user, successSignUp, signUpError, signInError } = state;

    useEffect(() => {
        checkAuth()
        // eslint-disable-next-line
    }, [])

    const checkAuth = () => checkIsAuthenticated()
        .then(data => dispatch({ type: SET_USER, payload: data }))
        .then(res => dispatch({ type: SET_IS_AUTHENTICATED, payload: true }))
        .catch(err => dispatch({ type: SET_IS_AUTHENTICATED, payload: false }))
        .then(err => dispatch({ type: SET_IS_LOADING, payload: false }))

    const login = credentials => authLogin(credentials)
        .then((data) => {
            dispatch({ type: SET_USER, payload: data });
            dispatch({ type: SET_IS_AUTHENTICATED, payload: true });
        })
        .catch(err => {
            dispatch({ type: SET_SIGNIN_ERROR, payload: err.response.data.message });
            dispatch({ type: SET_IS_AUTHENTICATED, payload: false });
        })

    const logout = () => authLogout()
        .then(res => dispatch({ type: SET_IS_AUTHENTICATED, payload: false }))
        .then(res => dispatch({ type: RESET }))

    const signUp = credentials => authSignUp(credentials)
        .then(res => dispatch({ type: SET_SUCCESS_SIGNUP, payload: true }))
        .catch(err => dispatch({ type: SET_SIGNUP_ERROR, payload: err.response.data.message }))

    const resetErrors = () => {
        dispatch({ type: SET_SIGNUP_ERROR, payload: '' });
        dispatch({ type: SET_SIGNIN_ERROR, payload: '' });
    }

    const resetSuccessSignUp = () => {
        dispatch({ type: SET_SUCCESS_SIGNUP, payload: false });
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, user, successSignUp, signUpError, signInError, resetSuccessSignUp, resetErrors, login, logout, signUp, }}>
            {children}
        </AuthContext.Provider>
    )
}