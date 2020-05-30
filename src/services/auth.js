import axios from './axios';
import localStorageService from './localStorageService'
import { avatarBackground } from '../helper'

export const checkIsAuthenticated = () =>
    axios.get('/check-auth')
        .then((res) => res.data)

export const authSignUp = (values) =>
    axios.post('/signup', { ...values, avatar: avatarBackground() });

export const authLogin = (values) =>
    axios.post('/signin', values)
        .then(res => {
            localStorageService.setToken(res.data.tokens);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.tokens.accessToken;
            return res.data.user;
        });

export const authLogout = () =>
    axios.post('/logout')
        .then(localStorageService.clearToken())