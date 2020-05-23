import React, { useEffect, useReducer } from 'react'
import { checkIsAuthenticated, authSignUp, authLogin, authLogout } from '../../services/auth.js'
import { AuthReducer, initialState } from './AuthReducer';
import { SET_IS_AUTHENTICATED, SET_IS_LOADING, SET_USER } from '../types'

export const AuthContext = React.createContext({})

export const Auth = ({ children }) => {

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        checkAuth()
        // eslint-disable-next-line
    }, [])

    const checkAuth = () => checkIsAuthenticated()
        .then(data => dispatch({ type: SET_USER, payload: data }))
        .then(() => dispatch({ type: SET_IS_AUTHENTICATED, payload: true }))
        .catch(() => dispatch({ type: SET_IS_AUTHENTICATED, payload: false }))
        .then(() => dispatch({ type: SET_IS_LOADING, payload: false }))

    const login = credentials => authLogin(credentials)
        .then((data) => dispatch({ type: SET_USER, payload: data }))
        .then(dispatch({ type: SET_IS_AUTHENTICATED, payload: true }))
        .catch(error => { dispatch({ type: SET_IS_AUTHENTICATED, payload: false }) })

    const logout = () => {
        authLogout()
        dispatch({ type: SET_IS_AUTHENTICATED, payload: false })
    }

    const signUp = credentials => authSignUp(credentials)

    return (
        <AuthContext.Provider value={{ isAuthenticated: state.isAuthenticated, isLoading: state.isLoading, user: state.user, login, logout, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}